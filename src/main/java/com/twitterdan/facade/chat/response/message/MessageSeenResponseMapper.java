package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.dto.chat.response.MessageSeenResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.ChatUserMapper;
import org.springframework.stereotype.Service;

@Service
public class MessageSeenResponseMapper extends GeneralFacade<MessageSeen, MessageSeenResponse> {
  private final ChatUserMapper chatUserMapper;

  public MessageSeenResponseMapper(ChatUserMapper chatUserMapper) {
    super(MessageSeen.class, MessageSeenResponse.class);
    this.chatUserMapper = chatUserMapper;
  }

  @Override
  protected void decorateDto(MessageSeenResponse dto, MessageSeen entity) {
    dto.setMessageId(entity.getMessage().getId());
    dto.setChatId(entity.getMessage().getChat().getId());
    dto.setUser(chatUserMapper.convertToDto(entity.getUser()));
  }
}
