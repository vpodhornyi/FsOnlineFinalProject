package com.twitterdan.dto.chat.request;

import lombok.Data;

@Data
public class MessageSeenRequest {
  private Long messageId;
  private Long userId;
  private Long chatId;
}
