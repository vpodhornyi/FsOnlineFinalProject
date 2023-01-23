package com.twitterdan.dto.signup;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
  private String name;
  private String email;
  private String password;
  private String birthDate;
  private String userTag;
}
