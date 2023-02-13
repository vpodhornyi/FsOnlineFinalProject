package com.twitterdan.facade.user;

import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.user.CustomStyle;
import com.twitterdan.dto.user.CustomStyleRequest;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class CustomStyleRequestMapper extends GeneralFacade<CustomStyle, CustomStyleRequest> {
  private final UserRepository userRepository;


  public CustomStyleRequestMapper(UserRepository userRepository) {
    super(CustomStyle.class, CustomStyleRequest.class);
    this.userRepository = userRepository;
  }

  @Override
  protected void decorateEntity(CustomStyle entity, CustomStyleRequest dto) {
    userRepository.findById(dto.getUserId()).ifPresent(entity::setUser);
  }
}

