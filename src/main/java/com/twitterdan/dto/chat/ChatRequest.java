package com.twitterdan.dto.chat;

import com.twitterdan.domain.chat.ChatType;
import lombok.Data;

import java.util.List;

@Data
public class ChatRequest {
  private Long id;
  private Long userId;
  private String key;
  private String message;
  private ChatType type;
  private List<ChatUser> users;
}
