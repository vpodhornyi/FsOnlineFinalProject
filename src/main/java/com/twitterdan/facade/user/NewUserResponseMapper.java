package com.twitterdan.facade.user;

import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.NewUserResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.auth.JwtAuthService;
import org.springframework.stereotype.Service;

@Service
public class NewUserResponseMapper extends GeneralFacade<User, NewUserResponse> {
  private final JwtAuthService jwtAuthService;

  public NewUserResponseMapper(JwtAuthService jwtAuthService) {
    super(User.class, NewUserResponse.class);
    this.jwtAuthService = jwtAuthService;
  }

  @Override
  protected void decorateDto(NewUserResponse dto, User entity) {
    dto.setJwt(jwtAuthService.getJwtResponse(entity));
  }
}
