package com.twitterdan.dto.chat.response;

import lombok.Data;

import java.util.List;

@Data
public abstract class ChatResponseAbstract {
  private Long id;
  private String key;
  private String title;
  private String type;
  private List<MessageResponse> messages;
  private MessageResponse lastMessage;
}
