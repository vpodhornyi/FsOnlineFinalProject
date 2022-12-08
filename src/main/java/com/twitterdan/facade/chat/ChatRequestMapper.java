package com.twitterdan.facade.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.ChatRequest;
import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ChatRequestMapper extends GeneralFacade<Chat, ChatRequest> {

  private final UserService userService;
  public ChatRequestMapper(UserService userService) {
    super(Chat.class, ChatRequest.class);
    this.userService = userService;
  }

  @Override
  protected void decorateEntity(Chat entity, ChatRequest dto) {
    Long userId = dto.getUserId();
    List<ChatUser> chatUsers = dto.getUsers();
    User user = userService.findById(userId);
    Set<User> users = chatUsers.stream()
      .map(u -> userService.findById(u.getId()))
      .collect(Collectors.toSet());

    users.add(user);

    entity.setUsers(users);
  }
}
