package com.twitterdan.facade.chat.response.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.chat.LeaveChatResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.ChatUserMapper;
import org.springframework.stereotype.Service;

@Service
public class LeaveChatResponseMapper extends GeneralFacade<Chat, LeaveChatResponse> {
  private final ChatUserMapper chatUserMapper;
  public LeaveChatResponseMapper(ChatUserMapper chatUserMapper) {
    super(Chat.class, LeaveChatResponse.class);
    this.chatUserMapper = chatUserMapper;
  }

  @Override
  protected void decorateDto(LeaveChatResponse dto, Chat entity, User user) {
    dto.setChatId(entity.getId());
    dto.setUser(chatUserMapper.convertToDto(user));
  }
}
