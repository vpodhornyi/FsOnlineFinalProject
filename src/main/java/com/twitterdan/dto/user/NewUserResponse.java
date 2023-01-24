package com.twitterdan.dto.user;

import com.twitterdan.dto.auth.JwtResponse;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NewUserResponse extends UserResponse {
  JwtResponse jwt;
}
