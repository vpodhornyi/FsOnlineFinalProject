package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privateMessage.PrivateMessageOwnerResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrivateMessageOwnerResponseMapper extends GeneralFacade<Message, PrivateMessageOwnerResponse> {
  private final MessageService messageService;
  public PrivateMessageOwnerResponseMapper(MessageService messageService) {
    super(Message.class, PrivateMessageOwnerResponse.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(PrivateMessageOwnerResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(entity.getChat().getId(), user.getId()));
    Optional<List<MessageSeen>> optionalSeen = entity.getSeen();
    Optional<MessageSeen> optionalMessageSeen = Optional.empty();

    if (optionalSeen.isPresent()) {
      optionalMessageSeen = optionalSeen.get().stream()
        .filter(e -> !e.getUser().equals(user))
        .findFirst();
    }
    dto.setIsMessageOwner(true);

    if (optionalMessageSeen.isPresent()) {
      dto.setIsMessageSeen(true);
    }
  }
}
