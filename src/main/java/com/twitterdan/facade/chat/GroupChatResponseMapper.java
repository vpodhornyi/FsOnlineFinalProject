package com.twitterdan.facade.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.dto.chat.GroupChatResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupChatResponseMapper extends GeneralFacade<Chat, GroupChatResponse> {
  private final ChatUserMapper chatUserMapper;

  public GroupChatResponseMapper(ChatUserMapper chatUserMapper) {
    super(Chat.class, GroupChatResponse.class);
    this.chatUserMapper = chatUserMapper;
  }

  @Override
  protected void decorateDto(GroupChatResponse dto, Chat entity) {
    super.decorateDto(dto, entity);

    List<ChatUser> users = entity.getUsers().stream()
      .map(chatUserMapper::convertToDto)
      .toList();

    dto.setUsers(users);
  }
}
