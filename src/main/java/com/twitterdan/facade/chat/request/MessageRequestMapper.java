package com.twitterdan.facade.chat.request;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.request.MessageRequest;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.ChatService;
import org.springframework.stereotype.Service;

@Service
public class MessageRequestMapper extends GeneralFacade<Message, MessageRequest> {
  private final ChatService chatService;

  public MessageRequestMapper(ChatService chatService) {
    super(Message.class, MessageRequest.class);
    this.chatService = chatService;
  }

  @Override
  protected void decorateEntity(Message entity, MessageRequest dto, User user) {
    entity.setUser(user);
    entity.setCreatedBy(user.getEmail());
    entity.setUpdatedBy(user.getEmail());
    entity.addSeen(user);

    Long chatId = dto.getChatId();
    Chat chat = chatService.findById(chatId);
    entity.setChat(chat);
  }
}
