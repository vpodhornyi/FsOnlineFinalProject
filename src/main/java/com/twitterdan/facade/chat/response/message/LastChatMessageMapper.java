package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.response.message.LastChatMessage;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class LastChatMessageMapper extends GeneralFacade<Message, LastChatMessage> {
  public LastChatMessageMapper() {
    super(Message.class, LastChatMessage.class);
  }
}
