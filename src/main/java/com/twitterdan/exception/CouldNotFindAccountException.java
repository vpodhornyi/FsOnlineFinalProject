package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotFindAccountException extends AbstractException {
  public CouldNotFindAccountException() {
    super(HttpStatus.BAD_REQUEST, "Sorry, we could not find your account!");
  }
}
