package com.twitterdan.facade.chat;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.ChatMessageRequest;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class MessageRequestMapper extends GeneralFacade<Message, ChatMessageRequest> {
  public MessageRequestMapper() {
    super(Message.class, ChatMessageRequest.class);
  }

  @Override
  protected void decorateEntity(Message entity, ChatMessageRequest dto) {

  }
}
