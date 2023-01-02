package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.response.message.DeletedMessage;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class DeletedMessageMapper extends GeneralFacade<Message, DeletedMessage> {
  public DeletedMessageMapper() {
    super(Message.class, DeletedMessage.class);
  }

  @Override
  protected void decorateDto(DeletedMessage dto, Message entity) {
    dto.setMessageId(entity.getId());
  }
}
