package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.MessageSeenDto;
import com.twitterdan.dto.chat.response.PrivateMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PrivateMessageResponseMapper extends GeneralFacade<Message, PrivateMessageResponse> {

  public PrivateMessageResponseMapper() {
    super(Message.class, PrivateMessageResponse.class);
  }

  @Override
  protected void decorateDto(PrivateMessageResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    List<MessageSeen> seen = entity.getSeen();
    Optional<MessageSeen> optionalMessageSeen = seen.stream().filter(e -> !Objects.equals(e.getUser().getId(), user.getId())).findFirst();
    MessageSeenDto messagesSeenDto = new MessageSeenDto();

    if (optionalMessageSeen.isPresent()) {
      MessageSeen messageSeen = optionalMessageSeen.get();
      messagesSeenDto.setId(messageSeen.getId());
      messagesSeenDto.setSeen(messageSeen.getSeen());
      messagesSeenDto.setMessageId(messageSeen.getMessage().getId());
      messagesSeenDto.setUserId(messageSeen.getUser().getId());
    }

    if (entity.getUser().equals(user)) {
      dto.setIsMessageOwner(true);
      dto.setMessageSeen(messagesSeenDto);
    }
  }
}
