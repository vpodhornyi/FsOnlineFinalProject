package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class DeleteTweetException extends AbstractException {
  private static final String MESSAGE = "You can't delete this tweet!";
  private static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public DeleteTweetException() {
    super(HttpStatus.BAD_REQUEST, DeleteTweetException.MESSAGE);
  }

  public DeleteTweetException(Boolean show) {
    super(DeleteTweetException.STATUS, DeleteTweetException.MESSAGE, show);
  }
}
