package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.MessageSeenDto;
import com.twitterdan.dto.chat.response.PrivateMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PrivateMessageResponseMapper extends GeneralFacade<Message, PrivateMessageResponse> {
  private final UserService userService;

  public PrivateMessageResponseMapper(UserService userService) {
    super(Message.class, PrivateMessageResponse.class);
    this.userService = userService;
  }

  @Override
  protected void decorateDto(PrivateMessageResponse dto, Message entity, Long authUserId) {
    User authUser = userService.findById(authUserId);
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    List<MessageSeen> seen = entity.getSeen();
    Optional<MessageSeen> optionalMessageSeen = seen.stream().filter(e -> !Objects.equals(e.getUser().getId(), authUser.getId())).findFirst();
    MessageSeenDto messagesSeenDto = new MessageSeenDto();

    if (optionalMessageSeen.isPresent()) {
      MessageSeen messageSeen = optionalMessageSeen.get();
      messagesSeenDto.setId(messageSeen.getId());
      messagesSeenDto.setSeen(messageSeen.getSeen());
      messagesSeenDto.setMessageId(messageSeen.getMessage().getId());
      messagesSeenDto.setUserId(messageSeen.getUser().getId());
    }
    dto.setIsAuthUserMessage(Objects.equals(entity.getUser().getId(), authUserId));
    dto.setMessageSeen(messagesSeenDto);
  }
}
