package com.twitterdan.dto.chat.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageSeenRequest {
  private Long messageId;
  private Long chatId;
}
