package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class ChatAlreadyExistException extends AbstractException {
  private final static String MESSAGE = "Chat already exist!";
  private final static HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public ChatAlreadyExistException() {
    super(ChatAlreadyExistException.STATUS, ChatAlreadyExistException.MESSAGE);
  }
}
