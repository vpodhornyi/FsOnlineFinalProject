package com.twitterdan.dto.chat.response.seen;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class MessageSeenResponseAbstract {
  private Long id;
  private final boolean seen = true;
  private Long messageId;
  private ChatUser user;
  private Long chatId;
}
