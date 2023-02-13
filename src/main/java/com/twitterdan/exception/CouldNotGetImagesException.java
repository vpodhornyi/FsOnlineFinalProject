package com.twitterdan.exception;

import org.springframework.http.HttpStatus;

public class CouldNotGetImagesException extends AbstractException {
  private static final String MESSAGE = "Could not get images, please try later!";

  public CouldNotGetImagesException() {
    super(HttpStatus.BAD_REQUEST, CouldNotGetImagesException.MESSAGE);
  }
}
