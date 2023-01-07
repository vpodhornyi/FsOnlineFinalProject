package com.twitterdan.dto.chat.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequest {
  private String text;
  private Long chatId;
  private String key;
}
