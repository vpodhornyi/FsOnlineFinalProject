package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class ChatAlreadyExistException extends AbstractException {
  private  static final String MESSAGE = "Chat already exist!";
  private  static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public ChatAlreadyExistException() {
    super(ChatAlreadyExistException.STATUS, ChatAlreadyExistException.MESSAGE);
  }
}
