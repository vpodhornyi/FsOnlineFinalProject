package com.twitterdan.dto.error;

public record ValidationError(String field, String message) {
}
