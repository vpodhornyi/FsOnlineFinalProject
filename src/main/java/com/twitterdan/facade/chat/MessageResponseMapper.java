package com.twitterdan.facade.chat;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.ChatMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class MessageResponseMapper extends GeneralFacade<Message, ChatMessageResponse> {
  public MessageResponseMapper() {
    super(Message.class, ChatMessageResponse.class);
  }

  @Override
  protected void decorateEntity(Message entity, ChatMessageResponse dto) {

  }
}
