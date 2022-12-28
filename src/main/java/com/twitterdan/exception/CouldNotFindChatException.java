package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotFindChatException extends AbstractException {
  private final static String MESSAGE = "Sorry, we could not find chat!";
  private final static HttpStatus STATUS = HttpStatus.BAD_REQUEST;
  public CouldNotFindChatException() {
    super(HttpStatus.BAD_REQUEST, CouldNotFindChatException.MESSAGE);
  }

  public CouldNotFindChatException(Boolean show) {
    super(CouldNotFindChatException.STATUS, CouldNotFindChatException.MESSAGE, show);
  }
}
