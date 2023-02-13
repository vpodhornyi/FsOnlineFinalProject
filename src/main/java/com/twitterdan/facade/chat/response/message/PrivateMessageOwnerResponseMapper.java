package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privatemessage.PrivateMessageOwnerResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

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
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setLastSeenChatMessageId(messageService.findLastSeenChatMessageId(userId, chatId));
    Chat chat = entity.getChat();
    if (chat.getDeleted().size() > 0) {
      chatService.resetDeletedChat(userId, chatId);
    }
  }
}
