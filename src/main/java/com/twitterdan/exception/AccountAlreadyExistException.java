package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class AccountAlreadyExistException extends AbstractException {
  private final static String MESSAGE = "Account already exist!";
  private final static String MESSAGE_EMAIL = "Account with email %S already exist!";
  private final static HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public AccountAlreadyExistException() {
    super(AccountAlreadyExistException.STATUS, AccountAlreadyExistException.MESSAGE);
  }

  public AccountAlreadyExistException(String email) {
    super(AccountAlreadyExistException.STATUS, String.format(AccountAlreadyExistException.MESSAGE_EMAIL, email));
  }
}
