package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class MessageAlreadySeen extends AbstractException {
  private static final String MESSAGE = "Message already seen!";
  private static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public MessageAlreadySeen() {
    super(MessageAlreadySeen.STATUS, MessageAlreadySeen.MESSAGE);
  }

  public MessageAlreadySeen(Boolean show) {
    super(MessageAlreadySeen.STATUS, MessageAlreadySeen.MESSAGE, show);
  }
}
