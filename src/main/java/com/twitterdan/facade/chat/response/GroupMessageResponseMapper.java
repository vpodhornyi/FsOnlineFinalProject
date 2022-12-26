package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.MessageSeenDto;
import com.twitterdan.dto.chat.response.GroupMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.MessageSeenDtoMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupMessageResponseMapper extends GeneralFacade<Message, GroupMessageResponse> {
  private final MessageSeenDtoMapper messageSeenMapper;

  public GroupMessageResponseMapper(MessageSeenDtoMapper messageSeenMapper) {
    super(Message.class, GroupMessageResponse.class);
    this.messageSeenMapper = messageSeenMapper;
  }

  @Override
  protected void decorateDto(GroupMessageResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);

    if (entity.getUser().equals(user)) {
      List<MessageSeenDto> messagesDto = entity.getSeen().stream()
        .filter(e -> !e.getUser().equals(user))
        .map(messageSeenMapper::convertToDto).toList();
      dto.setIsMessageOwner(true);
      dto.setMessagesSeen(messagesDto);
    } else {
      Optional<MessageSeen> optionalMessageSeen = entity.getSeen().stream()
        .filter(e -> e.getUser().equals(user)).findFirst();
      optionalMessageSeen.ifPresent(messageSeen -> dto.setMessageSeen(messageSeenMapper.convertToDto(messageSeen)));
    }
  }
}
