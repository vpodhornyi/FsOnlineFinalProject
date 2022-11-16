package com.twitterdan.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
public abstract class AbstractException extends ResponseStatusException {

  private final String showMessage;

  public AbstractException(HttpStatus status, String message) {
    super(status, message);
    this.showMessage = message;
  }
}
