package com.twitterdan.facade.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.PrivateChatResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.UserService;
import com.twitterdan.service.auth.JwtAuthService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivateChatResponseMapper extends GeneralFacade<Chat, PrivateChatResponse> {
  private final ChatUserMapper chatUserMapper;
  private final JwtAuthService jwtAuthService;
  private final UserService userService;

  public PrivateChatResponseMapper(JwtAuthService jwtAuthService, ChatUserMapper chatUserMapper, UserService userService) {
    super(Chat.class, PrivateChatResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.jwtAuthService = jwtAuthService;
    this.userService = userService;
  }

  @Override
  protected void decorateDto(PrivateChatResponse dto, Chat entity) {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    User authUser = userService.findByUserTag(userTag);
    List<User> users = entity.getUsers();

    if (authUser.equals(users.get(0))) {
      dto.setUserAuth(chatUserMapper.convertToDto(users.get(0)));
      dto.setUserGuest(chatUserMapper.convertToDto(users.get(1)));
      dto.setTitle(users.get(1).getName());
    } else {
      dto.setUserAuth(chatUserMapper.convertToDto(users.get(1)));
      dto.setUserGuest(chatUserMapper.convertToDto(users.get(0)));
      dto.setTitle(users.get(0).getName());
    }
  }
}
