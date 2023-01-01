package com.twitterdan.facade.chat.request;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.request.MessageRequest;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class MessageRequestMapper extends GeneralFacade<Message, MessageRequest> {

  private final UserService userService;
  private final ChatService chatService;

  public MessageRequestMapper(UserService userService, ChatService chatService) {
    super(Message.class, MessageRequest.class);
    this.userService = userService;
    this.chatService = chatService;
  }

  @Override
  protected void decorateEntity(Message entity, MessageRequest dto) {
    Long userId = dto.getUserId();
    User user = userService.findById(userId);
    entity.setUser(user);
    entity.setCreatedBy(user.getEmail());
    entity.setUpdatedBy(user.getEmail());

    Long chatId = dto.getChatId();
    Chat chat = chatService.findById(chatId);
    entity.setChat(chat);
  }
}
