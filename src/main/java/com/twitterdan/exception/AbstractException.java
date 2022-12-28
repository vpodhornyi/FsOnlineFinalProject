package com.twitterdan.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
@Setter
public abstract class AbstractException extends ResponseStatusException {

  private String showMessage;
  private Boolean show = true;

  public AbstractException(HttpStatus status, String message) {
    super(status, message);
    this.showMessage = message;
  }

  public AbstractException(HttpStatus status, String message, Boolean show) {
    super(status, message);
    this.showMessage = message;
    this.show = show;
  }
}
