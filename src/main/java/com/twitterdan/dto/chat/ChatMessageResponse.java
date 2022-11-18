package com.twitterdan.dto.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ChatMessageResponse {
  private String text;
  private Chat chat;
  private Date createdAt;
  private User user;
}
