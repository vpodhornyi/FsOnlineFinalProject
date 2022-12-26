package com.twitterdan.dto.chat.response;

import lombok.Data;

@Data
public abstract class ChatResponseAbstract {
  private Long id;
  private String key;
  private String title;
  private String type;
}
