package com.twitterdan.dto.chat.request;

import lombok.Data;

@Data
public abstract class ChatRequestAbstract {
  private String message;
  private String type;
  private String oldKey;
}
