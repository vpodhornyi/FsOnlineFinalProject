package com.twitterdan.dto.chat.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LeaveChatRequest {
  private Long chatId;
  private Long userId;
  private boolean groupChat;
  private boolean privateChat;
}
