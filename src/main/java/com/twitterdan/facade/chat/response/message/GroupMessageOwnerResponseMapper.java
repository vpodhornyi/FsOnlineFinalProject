package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.MessageSeenResponse;
import com.twitterdan.dto.chat.response.message.groupMessage.GroupMessageOwnerResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupMessageOwnerResponseMapper extends GeneralFacade<Message, GroupMessageOwnerResponse> {
  private final MessageSeenResponseMapper messageSeenResponseMapper;

  public GroupMessageOwnerResponseMapper(MessageSeenResponseMapper messageSeenMapper) {
    super(Message.class, GroupMessageOwnerResponse.class);
    this.messageSeenResponseMapper = messageSeenMapper;
  }

  @Override
  protected void decorateDto(GroupMessageOwnerResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    Optional<List<MessageSeen>> seen = entity.getSeen();

    if (seen.isPresent()) {
      List<MessageSeenResponse> messagesDto = seen.get().stream()
        .filter(e -> !e.getUser().equals(user))
        .map(messageSeenResponseMapper::convertToDto).toList();
      dto.setMessagesSeen(messagesDto);
    } else {
      dto.setMessagesSeen(new ArrayList<>());
    }
  }
}
