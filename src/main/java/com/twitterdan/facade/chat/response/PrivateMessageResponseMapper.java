package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.MessageSeenResponse;
import com.twitterdan.dto.chat.response.PrivateMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrivateMessageResponseMapper extends GeneralFacade<Message, PrivateMessageResponse> {

  private final MessageSeenResponseMapper messageSeenMapper;

  public PrivateMessageResponseMapper(MessageSeenResponseMapper messageSeenMapper) {
    super(Message.class, PrivateMessageResponse.class);
    this.messageSeenMapper = messageSeenMapper;
  }

  @Override
  protected void decorateDto(PrivateMessageResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    Optional<List<MessageSeen>> optionalSeen = entity.getSeen();
    Optional<MessageSeen> optionalMessageSeen = Optional.empty();

    if (entity.getUser().equals(user)) {
      if (optionalSeen.isPresent()) {
        optionalMessageSeen = optionalSeen.get().stream()
          .filter(e -> !e.getUser().equals(user))
          .findFirst();
      }

      dto.setIsMessageOwner(true);

    } else {
      if (optionalSeen.isPresent()) {
        optionalMessageSeen = optionalSeen.get().stream()
          .filter(e -> e.getUser().equals(user))
          .findFirst();
      }
    }

    if (optionalMessageSeen.isPresent()) {
      MessageSeenResponse messagesSeenDto = messageSeenMapper.convertToDto(optionalMessageSeen.get());
      dto.setMessageSeen(messagesSeenDto);
    }
  }
}
