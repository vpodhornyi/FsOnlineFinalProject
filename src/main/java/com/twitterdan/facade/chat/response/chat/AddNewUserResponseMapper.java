package com.twitterdan.facade.chat.response.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.chat.AddUsersToGroupResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.ChatUserMapper;
import org.springframework.stereotype.Service;

@Service
public class AddNewUserResponseMapper extends GeneralFacade<Chat, AddUsersToGroupResponse> {
  private final ChatUserMapper chatUserMapper;

  public AddNewUserResponseMapper(ChatUserMapper chatUserMapper) {
    super(Chat.class, AddUsersToGroupResponse.class);
    this.chatUserMapper = chatUserMapper;
  }

  @Override
  protected void decorateDto(AddUsersToGroupResponse dto, Chat entity, User user) {
    dto.setChatId(entity.getId());
    dto.setUser(chatUserMapper.convertToDto(user));
    dto.setAddedUsers(entity.getUsers().stream().map(chatUserMapper::convertToDto).toList());
  }
}
