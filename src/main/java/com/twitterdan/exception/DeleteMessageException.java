package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class DeleteMessageException extends AbstractException {
  private final static String MESSAGE = "You can't delete this message!";
  private final static HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public DeleteMessageException() {
    super(HttpStatus.BAD_REQUEST, DeleteMessageException.MESSAGE);
  }

  public DeleteMessageException(Boolean show) {
    super(DeleteMessageException.STATUS, DeleteMessageException.MESSAGE, show);
  }
}


