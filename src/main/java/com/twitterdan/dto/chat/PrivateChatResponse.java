package com.twitterdan.dto.chat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PrivateChatResponse extends ChatResponseAbstract {
  private String title;
  private ChatUser userAuth;
  private ChatUser userGuest;
}
