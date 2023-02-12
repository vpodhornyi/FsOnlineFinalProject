package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotFindChatException extends AbstractException {
  private  static final String MESSAGE = "Sorry, we could not find chat!";
  private  static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public CouldNotFindChatException() {

    super(HttpStatus.BAD_REQUEST, CouldNotFindChatException.MESSAGE);
  }

  public CouldNotFindChatException(Boolean show) {
    super(CouldNotFindChatException.STATUS, CouldNotFindChatException.MESSAGE, show);
  }
}
