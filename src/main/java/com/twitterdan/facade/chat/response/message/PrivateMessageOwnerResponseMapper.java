package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privateMessage.PrivateMessageOwnerResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrivateMessageOwnerResponseMapper extends GeneralFacade<Message, PrivateMessageOwnerResponse> {
  private final MessageService messageService;
  private final ChatService chatService;

  public PrivateMessageOwnerResponseMapper(MessageService messageService, ChatService chatService) {
    super(Message.class, PrivateMessageOwnerResponse.class);
    this.messageService = messageService;
    this.chatService = chatService;
  }

  @Override
  protected void decorateDto(PrivateMessageOwnerResponse dto, Message entity, User user) {
    Chat chat = entity.getChat();
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setLastSeenChatMessageId(messageService.findLastSeenChatMessageId(userId, chatId));

    if (chat.getDeleted().size() > 0) {
      chatService.resetDeletedChat(userId, chatId);
    }

/*    Optional<List<MessageSeen>> optionalSeen = entity.getSeen();
    Optional<MessageSeen> optionalMessageSeen = Optional.empty();

    if (optionalSeen.isPresent()) {
      optionalMessageSeen = optionalSeen.get().stream()
        .filter(e -> !e.getUser().equals(user))
        .findFirst();
    }

    dto.setIsMessageSeen(optionalMessageSeen.isPresent());*/

    dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
  }
}
