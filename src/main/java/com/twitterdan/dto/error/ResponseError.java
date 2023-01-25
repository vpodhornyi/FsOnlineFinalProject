package com.twitterdan.dto.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
public class ResponseError {
  private final int status;
  private final String message;
  private final Boolean show;
  private String stackTrace;
  private List<ValidationError> errors;

  public ResponseError(int status, String message, Boolean show, String stackTrace) {
    this.status = status;
    this.message = message;
    this.show = show;
    this.stackTrace = stackTrace;
  }

  public void addValidationError(String field, String message) {
    if (Objects.isNull(errors)) {
      errors = new ArrayList<>();
    }
    errors.add(new ValidationError(field, message));
  }
}
