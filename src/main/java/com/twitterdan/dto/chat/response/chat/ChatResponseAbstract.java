package com.twitterdan.dto.chat.response.chat;

import com.twitterdan.dto.DtoResponseType;
import com.twitterdan.dto.chat.response.message.LastChatMessage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class ChatResponseAbstract {
  private Long id;
  private final DtoResponseType type = DtoResponseType.CHAT;
  private String key;
  private String oldKey;
  private String title;
  private LastChatMessage lastMessage;
}
