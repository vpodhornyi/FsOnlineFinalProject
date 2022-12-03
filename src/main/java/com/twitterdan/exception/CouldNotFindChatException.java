package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotFindChatException extends AbstractException{
  public CouldNotFindChatException() {
    super(HttpStatus.BAD_REQUEST, "Sorry, we could not find chat!");
  }
}
