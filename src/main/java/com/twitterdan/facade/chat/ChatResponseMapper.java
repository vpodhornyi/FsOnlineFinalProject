package com.twitterdan.facade.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.dto.chat.ChatResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class ChatResponseMapper extends GeneralFacade<Chat, ChatResponse> {
  public ChatResponseMapper() {
    super(Chat.class, ChatResponse.class);
  }
}
