package com.twitterdan.facade.chat.response.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.chat.LeaveChatResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.ChatUserMapper;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class LeaveChatResponseMapper extends GeneralFacade<Chat, LeaveChatResponse> {
  private final ChatUserMapper chatUserMapper;

  private final MessageService messageService;

  public LeaveChatResponseMapper(ChatUserMapper chatUserMapper, MessageService messageService) {
    super(Chat.class, LeaveChatResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(LeaveChatResponse dto, Chat entity, User user) {
    dto.setChatId(entity.getId());
    dto.setUser(chatUserMapper.convertToDto(user));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(user.getId()));
  }
}
