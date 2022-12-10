package com.twitterdan.dto.chat.response;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class MessageResponse {
  private Long id;
  private String key;
  private String text;
  private LocalDateTime createdAt;
  private Long chatId;
  private ChatUser user;
}
