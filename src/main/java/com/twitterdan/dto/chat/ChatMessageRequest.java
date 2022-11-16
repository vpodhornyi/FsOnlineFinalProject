package com.twitterdan.dto.chat;

import lombok.Data;

@Data
public class ChatMessageRequest {
  private String text;
  private Long chatId;
}
