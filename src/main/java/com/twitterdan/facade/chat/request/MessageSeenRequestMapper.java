package com.twitterdan.facade.chat.request;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.request.MessageSeenRequest;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class MessageSeenRequestMapper extends GeneralFacade<MessageSeen, MessageSeenRequest> {
  private final MessageService messageService;

  public MessageSeenRequestMapper(MessageService messageService) {
    super(MessageSeen.class, MessageSeenRequest.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateEntity(MessageSeen entity, MessageSeenRequest dto, User user) {
    Message message = messageService.findById(dto.getMessageId());
    entity.setUser(user);
    entity.setMessage(message);
    entity.setCreatedBy(user.getEmail());
    entity.setUpdatedBy(user.getEmail());
  }
}
