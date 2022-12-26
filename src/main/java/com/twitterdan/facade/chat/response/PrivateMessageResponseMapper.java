package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.MessageSeenDto;
import com.twitterdan.dto.chat.response.PrivateMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.MessageSeenDtoMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrivateMessageResponseMapper extends GeneralFacade<Message, PrivateMessageResponse> {

  private final MessageSeenDtoMapper messageSeenMapper;

  public PrivateMessageResponseMapper(MessageSeenDtoMapper messageSeenMapper) {
    super(Message.class, PrivateMessageResponse.class);
    this.messageSeenMapper = messageSeenMapper;
  }

  @Override
  protected void decorateDto(PrivateMessageResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    List<MessageSeen> seen = entity.getSeen();
    Optional<MessageSeen> optionalMessageSeen;

    if (entity.getUser().equals(user)) {
      optionalMessageSeen = seen.stream()
        .filter(e -> !e.getUser().equals(user))
        .findFirst();
      dto.setIsMessageOwner(true);

    } else {
      optionalMessageSeen = seen.stream()
        .filter(e -> e.getUser().equals(user))
        .findFirst();
    }

    if (optionalMessageSeen.isPresent()) {
      MessageSeenDto messagesSeenDto = messageSeenMapper.convertToDto(optionalMessageSeen.get());
      dto.setMessageSeen(messagesSeenDto);
    }
  }
}
