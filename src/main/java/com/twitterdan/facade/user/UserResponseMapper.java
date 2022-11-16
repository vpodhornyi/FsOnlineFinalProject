package com.twitterdan.facade.user;

import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.UserResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class UserResponseMapper extends GeneralFacade<User, UserResponse> {
  public UserResponseMapper() {
    super(User.class, UserResponse.class);
  }

  @Override
  protected void decorateEntity(User entity, UserResponse dto) {

  }
}
