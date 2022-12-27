package com.twitterdan.dto.chat.response.message;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public abstract class MessageResponseAbstract {
  private Long id;
  private String type = "MESSAGE";
  private String oldKey;
  private String key;
  private String text;
  private LocalDateTime createdAt;
  private Long chatId;
  private ChatUser user;
}
