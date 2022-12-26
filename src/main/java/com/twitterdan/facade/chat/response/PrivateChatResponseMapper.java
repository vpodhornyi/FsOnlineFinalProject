package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.PrivateChatResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.ChatUserMapper;
import com.twitterdan.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivateChatResponseMapper extends GeneralFacade<Chat, PrivateChatResponse> {
  private final ChatUserMapper chatUserMapper;
  private final UserService userService;
  private final PrivateMessageResponseMapper privateMessageResponseMapper;

  public PrivateChatResponseMapper(ChatUserMapper chatUserMapper, UserService userService,
                                   PrivateMessageResponseMapper privateMessageResponseMapper) {
    super(Chat.class, PrivateChatResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.userService = userService;
    this.privateMessageResponseMapper = privateMessageResponseMapper;
  }

  @Override
  protected void decorateDto(PrivateChatResponse dto, Chat entity, Long authUserId) {
    User authUser = userService.findById(authUserId);
    List<User> users = entity.getUsers();

    if (authUser.equals(users.get(0))) {
      dto.setAuthUser(chatUserMapper.convertToDto(users.get(0)));
      dto.setGuestUser(chatUserMapper.convertToDto(users.get(1)));
      dto.setTitle(users.get(1).getName());
      dto.setUserTag(users.get(1).getUserTag());
      dto.setAvatarImgUrl(users.get(1).getAvatarImgUrl());
    } else {
      dto.setAuthUser(chatUserMapper.convertToDto(users.get(1)));
      dto.setGuestUser(chatUserMapper.convertToDto(users.get(0)));
      dto.setTitle(users.get(0).getName());
      dto.setUserTag(users.get(0).getUserTag());
      dto.setAvatarImgUrl(users.get(0).getAvatarImgUrl());
    }
    if (entity.getLastMessage() != null) {
      dto.setLastMessage(privateMessageResponseMapper.convertToDto(entity.getLastMessage()));
    }
  }
}
