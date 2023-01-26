package com.twitterdan.facade.user;

import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.UserResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class UserResponseMapper extends GeneralFacade<User, UserResponse> {
  private final MessageService messageService;

  public UserResponseMapper(MessageService messageService) {
    super(User.class, UserResponse.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(UserResponse dto, User entity) {
    dto.setCountUnreadMessages(messageService.getCountAllUnreadChatMessagesByUserId(entity.getId()));
  }
}
