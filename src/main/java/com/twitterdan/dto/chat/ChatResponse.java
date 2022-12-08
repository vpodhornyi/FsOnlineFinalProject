package com.twitterdan.dto.chat;

import com.twitterdan.domain.chat.ChatType;
import lombok.Data;

import java.util.List;

@Data
public class ChatResponse {
  private Long id;
  private String key;
  private String title;
  private ChatType type;
  private List<ChatUser> users;

}
