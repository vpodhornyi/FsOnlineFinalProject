package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class AccountExistException extends AbstractException{
  public AccountExistException(String email) {
    super(HttpStatus.BAD_REQUEST, "Account with email " + email + " already exist!");
  }
}
