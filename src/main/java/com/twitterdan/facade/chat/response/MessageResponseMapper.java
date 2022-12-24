package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.dto.chat.MessageSeenDto;
import com.twitterdan.dto.chat.response.MessageResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageResponseMapper extends GeneralFacade<Message, MessageResponse> {
  public MessageResponseMapper() {
    super(Message.class, MessageResponse.class);
  }

  @Override
  protected void decorateDto(MessageResponse dto, Message entity) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    List<MessageSeenDto> messagesDto = entity.getSeen().stream()
      .map(e -> {
        MessageSeenDto obj = new MessageSeenDto();
        obj.setId(e.getId());
        obj.setSeen(e.getSeen());
        obj.setMessageId(e.getMessage().getId());
        obj.setUserId(e.getUser().getId());
        return obj;
      }).toList();
    dto.setSeen(messagesDto);
  }
}
