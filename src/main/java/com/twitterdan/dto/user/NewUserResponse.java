package com.twitterdan.dto.user;

import com.twitterdan.dto.auth.JwtResponse;

public class NewUserResponse extends UserResponse {
  JwtResponse jwt;
}
