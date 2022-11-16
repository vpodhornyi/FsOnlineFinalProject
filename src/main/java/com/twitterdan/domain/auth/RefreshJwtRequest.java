package com.twitterdan.domain.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshJwtRequest {
  public String refreshToken;
}
