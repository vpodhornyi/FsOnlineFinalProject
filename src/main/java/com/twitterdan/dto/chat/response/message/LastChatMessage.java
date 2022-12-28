package com.twitterdan.dto.chat.response.message;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LastChatMessage extends MessageResponseAbstract {
  private boolean IsMessageSeen = false;
  private boolean IsMessageOwner = false;
}
