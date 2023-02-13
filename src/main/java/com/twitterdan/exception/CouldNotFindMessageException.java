package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotFindMessageException extends AbstractException {
  private static final String MESSAGE = "Sorry, we could not find message!";
  private static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public CouldNotFindMessageException() {
    super(HttpStatus.BAD_REQUEST, CouldNotFindMessageException.MESSAGE);
  }

  public CouldNotFindMessageException(Boolean show) {
    super(CouldNotFindMessageException.STATUS, CouldNotFindMessageException.MESSAGE, show);
  }
}

