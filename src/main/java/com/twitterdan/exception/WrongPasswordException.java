package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class WrongPasswordException extends AbstractException {
  private final static String MESSAGE = "Wrong password!";

  public WrongPasswordException() {
    super(HttpStatus.BAD_REQUEST, WrongPasswordException.MESSAGE);
  }
}
