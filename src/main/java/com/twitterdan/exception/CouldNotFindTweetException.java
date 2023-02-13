package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotFindTweetException extends AbstractException {
  private  static final String MESSAGE = "Sorry, we could not find tweet!";
  private  static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public CouldNotFindTweetException() {

    super(HttpStatus.BAD_REQUEST, CouldNotFindTweetException.MESSAGE);
  }

  public CouldNotFindTweetException(Boolean show) {
    super(CouldNotFindTweetException.STATUS, CouldNotFindTweetException.MESSAGE, show);
  }
}
