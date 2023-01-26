package com.twitterdan.facade.chat.request;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.dto.chat.request.PrivateChatRequest;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.UserService;
import org.springframework.stereotype.Service;
import com.twitterdan.domain.user.User;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrivateChatRequestMapper extends GeneralFacade<Chat, PrivateChatRequest> {

  private final UserService userService;

  public PrivateChatRequestMapper(UserService userService) {
    super(Chat.class, PrivateChatRequest.class);
    this.userService = userService;
  }

  @Override
  protected void decorateEntity(Chat entity, PrivateChatRequest dto, User authUser) {
    Long guestUserId = dto.getGuestUserId();
    User guestUser = userService.findById(guestUserId);
    List<User> users = new ArrayList<>();
    users.add(authUser);
    users.add(guestUser);
    String email = authUser.getEmail();
    entity.setUsers(users);
    entity.setCreatedBy(email);
    entity.setUpdatedBy(email);
  }
}
