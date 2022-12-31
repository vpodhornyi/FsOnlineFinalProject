package com.twitterdan.facade.chat.response.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.DtoResponseType;
import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.dto.chat.response.chat.GroupChatResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.ChatUserMapper;
import com.twitterdan.facade.chat.response.message.LastChatMessageMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupChatResponseMapper extends GeneralFacade<Chat, GroupChatResponse> {
  private final ChatUserMapper chatUserMapper;
  private final LastChatMessageMapper lastChatMessageMapper;

  public GroupChatResponseMapper(ChatUserMapper chatUserMapper, LastChatMessageMapper lastChatMessageMapper) {
    super(Chat.class, GroupChatResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.lastChatMessageMapper = lastChatMessageMapper;
  }

  @Override
  protected void decorateDto(GroupChatResponse dto, Chat entity, User user) {
    List<ChatUser> users = entity.getUsers().stream()
      .map(chatUserMapper::convertToDto)
      .toList();

    dto.setUsers(users);

    if (entity.getLastMessage() != null) {
      dto.setLastMessage(lastChatMessageMapper.convertToDto(entity.getLastMessage(), user));
    }
  }
}
