package com.twitterdan.facade.chat;

import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.dto.chat.MessageSeenDto;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class MessageSeenDtoMapper  extends GeneralFacade<MessageSeen, MessageSeenDto> {
  public MessageSeenDtoMapper() {
    super(MessageSeen.class, MessageSeenDto.class);
  }

  @Override
  protected void decorateDto(MessageSeenDto dto, MessageSeen entity) {
    dto.setMessageId(entity.getMessage().getId());
    dto.setChatId(entity.getMessage().getChat().getId());
    dto.setUserId(entity.getUser().getId());
  }
}
