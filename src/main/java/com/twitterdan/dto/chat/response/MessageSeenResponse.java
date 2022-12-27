package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageSeenResponse {
  private Long id;
  private String type = "MESSAGE_SEEN";
  private boolean seen;
  private Long messageId;
  private ChatUser user;
  private Long chatId;
}
