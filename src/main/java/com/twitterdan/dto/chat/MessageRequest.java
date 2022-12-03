package com.twitterdan.dto.chat;

import lombok.Data;

@Data
public class MessageRequest {
  private String text;
  private Long chatId;
  private Long userId;
}
