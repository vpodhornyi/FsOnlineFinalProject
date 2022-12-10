package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotFindChatException extends AbstractException {
  private final static String MESSAGE = "Sorry, we could not find chat!";
  public CouldNotFindChatException() {
    super(HttpStatus.BAD_REQUEST, CouldNotFindChatException.MESSAGE);
  }
}
