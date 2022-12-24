package com.twitterdan.dto.chat;

import lombok.Data;

@Data
public class MessageSeenDto {
  private Long id;
  private boolean seen;
  private Long messageId;
  private Long userId;
}
