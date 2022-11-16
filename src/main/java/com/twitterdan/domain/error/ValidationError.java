package com.twitterdan.domain.error;

public record ValidationError(String field, String message) {
}
