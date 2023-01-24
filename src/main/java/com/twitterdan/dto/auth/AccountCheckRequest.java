package com.twitterdan.dto.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
public class AccountCheckRequest {
  @NotBlank(message = "Login is mandatory")
  @Pattern(regexp = "^[\\w!#$%&'*+-/=?^_`{|}~@.]*$", message = "Login has unsupported characters!")
  private String login;
}
