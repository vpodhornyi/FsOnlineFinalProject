package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.MessageSeenResponse;
import com.twitterdan.dto.chat.response.GroupMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupMessageResponseMapper extends GeneralFacade<Message, GroupMessageResponse> {
  private final MessageSeenResponseMapper messageSeenResponseMapper;

  public GroupMessageResponseMapper(MessageSeenResponseMapper messageSeenMapper) {
    super(Message.class, GroupMessageResponse.class);
    this.messageSeenResponseMapper = messageSeenMapper;
  }

  @Override
  protected void decorateDto(GroupMessageResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    Optional<List<MessageSeen>> seen = entity.getSeen();

    if (entity.getUser().equals(user)) {

      if (seen.isPresent()) {
        List<MessageSeenResponse> messagesDto = seen.get().stream()
          .filter(e -> !e.getUser().equals(user))
          .map(messageSeenResponseMapper::convertToDto).toList();
        dto.setMessagesSeen(messagesDto);
      } else {
        dto.setMessagesSeen(new ArrayList<>());
      }
      dto.setIsMessageOwner(true);

    }
//    else {
//
//      if (seen.isPresent()) {
//        Optional<MessageSeen> optionalMessageSeen = seen.get().stream()
//          .filter(e -> e.getUser().equals(user)).findFirst();
//        optionalMessageSeen.ifPresent(messageSeen -> dto.setMessageSeen(messageSeenResponseMapper.convertToDto(messageSeen)));
//      }
//    }
  }
}
