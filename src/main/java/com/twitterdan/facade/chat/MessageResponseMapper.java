package com.twitterdan.facade.chat;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.MessageResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class MessageResponseMapper extends GeneralFacade<Message, MessageResponse> {
  public MessageResponseMapper() {
    super(Message.class, MessageResponse.class);
  }

  @Override
  protected void decorateDto(MessageResponse dto, Message entity) {
    Long userId = entity.getUser().getId();
    Long chatId = entity.getChat().getId();
    dto.setUserId(userId);
    dto.setChatId(chatId);
  }
}
