package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.dto.chat.response.ChatResponseAbstract;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class ChatResponseMapper extends GeneralFacade<Chat, ChatResponseAbstract> {
  public ChatResponseMapper() {
    super(Chat.class, ChatResponseAbstract.class);
  }
}
