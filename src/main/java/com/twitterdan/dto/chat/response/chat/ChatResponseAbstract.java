package com.twitterdan.dto.chat.response.chat;

import com.twitterdan.dto.chat.response.message.LastChatMessage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class ChatResponseAbstract {
  private Long id;
  private String key;
  private String title;
  private String type;
  private LastChatMessage lastMessage;
}
