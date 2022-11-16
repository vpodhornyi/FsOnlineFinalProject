package com.twitterdan.controller;

import com.twitterdan.domain.error.ResponseError;
import com.twitterdan.exception.AbstractException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(AbstractException.class)
  public ResponseEntity<Object> handleItemNotFoundException(AbstractException exception) {
    final ResponseError responseError = new ResponseError(exception.getRawStatusCode(), exception.getShowMessage());

    return ResponseEntity
      .status(exception.getRawStatusCode())
      .body(responseError);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> onMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
    int statusCode = HttpStatus.BAD_REQUEST.value();
    String message = Objects.requireNonNull(exception.getFieldError()).getDefaultMessage();
    String stackTrace = exception.getMessage();
    final ResponseError responseError = new ResponseError(statusCode, message, stackTrace);

    return ResponseEntity.status(statusCode).body(responseError);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> internalServerErrorException(Exception exception) {
    final String serverErrorMessage = "Oops, something went wrong, please try again!";
    int statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
    final ResponseError responseError = new ResponseError(statusCode, serverErrorMessage, exception.getMessage());

    return ResponseEntity.status(statusCode).body(responseError);
  }
}
