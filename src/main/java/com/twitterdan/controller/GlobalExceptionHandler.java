package com.twitterdan.controller;

import com.twitterdan.domain.error.ResponseError;
import com.twitterdan.exception.AbstractException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(AbstractException.class)
  public ResponseEntity<Object> handleItemNotFoundException(AbstractException e) {
    final ResponseError responseError = new ResponseError(e.getRawStatusCode(), e.getShowMessage());

    return ResponseEntity
      .status(e.getRawStatusCode())
      .body(responseError);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> onMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    int statusCode = HttpStatus.BAD_REQUEST.value();
    final ResponseError responseError = new ResponseError(statusCode, e.getFieldError().getDefaultMessage(), e.getMessage());

    return ResponseEntity.status(statusCode).body(responseError);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> internalServerErrorException(Exception e) {
    final String INTERNAL_SERVER_ERROR_MESSAGE = "Oops, something went wrong, please try again!";
    int statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
    final ResponseError responseError = new ResponseError(statusCode, INTERNAL_SERVER_ERROR_MESSAGE, e.getMessage());

    return ResponseEntity.status(statusCode).body(responseError);
  }
}
