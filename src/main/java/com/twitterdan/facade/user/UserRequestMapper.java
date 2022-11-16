package com.twitterdan.facade.user;

import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.UserRequest;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class UserRequestMapper extends GeneralFacade<User, UserRequest> {
  public UserRequestMapper() {
    super(User.class, UserRequest.class);
  }

  @Override
  protected void decorateEntity(User entity, UserRequest dto) {

  }
}
