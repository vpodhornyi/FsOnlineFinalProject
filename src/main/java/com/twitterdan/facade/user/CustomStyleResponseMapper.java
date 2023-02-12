package com.twitterdan.facade.user;

import com.twitterdan.domain.user.CustomStyle;
import com.twitterdan.dto.user.CustomStyleResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class CustomStyleResponseMapper extends GeneralFacade<CustomStyle, CustomStyleResponse> {
  public CustomStyleResponseMapper() {
    super(CustomStyle.class, CustomStyleResponse.class);
  }
}
