package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public abstract class MessageResponseAbstract {
  private Long id;
  private String key;
  private String text;
  private LocalDateTime createdAt;
  private Long chatId;
  private ChatUser user;
}
