package com.twitterdan.domain.error;

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
  private String stackTrace;
  private List<ValidationError> errors;

  public ResponseError(int status, String message, String stackTrace) {
    this.status = status;
    this.message = message;
    this.stackTrace = stackTrace;
  }

  public void addValidationError(String field, String message) {
    if (Objects.isNull(errors)) {
      errors = new ArrayList<>();
    }
    errors.add(new ValidationError(field, message));
  }
}
