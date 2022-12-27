package com.twitterdan.facade.chat.request;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.request.MessageSeenRequest;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.MessageService;
import com.twitterdan.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class MessageSeenRequestMapper extends GeneralFacade<MessageSeen, MessageSeenRequest> {
  private final UserService userService;
  private final MessageService messageService;

  public MessageSeenRequestMapper(UserService userService, MessageService messageService) {
    super(MessageSeen.class, MessageSeenRequest.class);
    this.userService = userService;
    this.messageService = messageService;
  }

  @Override
  protected void decorateEntity(MessageSeen entity, MessageSeenRequest dto) {
    User user = userService.findById(dto.getUserId());
    Message message = messageService.findById(dto.getMessageId());
    entity.setSeen(true);
    entity.setUser(user);
    entity.setMessage(message);
    entity.setCreatedBy(user.getEmail());
    entity.setUpdatedBy(user.getEmail());
  }
}
