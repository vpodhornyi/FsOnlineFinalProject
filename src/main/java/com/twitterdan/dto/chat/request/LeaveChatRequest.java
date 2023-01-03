package com.twitterdan.dto.chat.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeaveChatRequest {
  private Long chatId;
  private Long userId;
  private boolean isPrivate;
  private boolean isGroup;
}
