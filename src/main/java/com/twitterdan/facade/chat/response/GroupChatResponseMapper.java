package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.dto.chat.response.GroupChatResponse;
import com.twitterdan.dto.chat.response.MessageResponseAbstract;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.ChatUserMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupChatResponseMapper extends GeneralFacade<Chat, GroupChatResponse> {
  private final ChatUserMapper chatUserMapper;
  private final GroupMessageResponseMapper groupMessageResponseMapper;

  public GroupChatResponseMapper(ChatUserMapper chatUserMapper, GroupMessageResponseMapper groupMessageResponseMapper) {
    super(Chat.class, GroupChatResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.groupMessageResponseMapper = groupMessageResponseMapper;
  }

  @Override
  protected void decorateDto(GroupChatResponse dto, Chat entity) {
    super.decorateDto(dto, entity);

    List<ChatUser> users = entity.getUsers().stream()
      .map(chatUserMapper::convertToDto)
      .toList();

    dto.setUsers(users);
    if (entity.getLastMessage() != null) {
      dto.setLastMessage(groupMessageResponseMapper.convertToDto(entity.getLastMessage()));
    }
  }
}
