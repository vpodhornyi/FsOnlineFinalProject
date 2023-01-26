package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class MessageAlreadySeen extends AbstractException {
  private final static String MESSAGE = "Message already seen!";
  private final static HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public MessageAlreadySeen() {
    super(MessageAlreadySeen.STATUS, MessageAlreadySeen.MESSAGE);
  }

  public MessageAlreadySeen(Boolean show) {
    super(MessageAlreadySeen.STATUS, MessageAlreadySeen.MESSAGE, show);
  }
}
