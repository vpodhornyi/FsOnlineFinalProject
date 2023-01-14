package com.twitterdan.dto.chat.response.message.privateMessage;

import com.twitterdan.dto.chat.response.message.MessageResponseAbstract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class PrivateMessageResponseAbstract extends MessageResponseAbstract {
  private final boolean IsPrivateChat = true;
  private boolean IsMessageSeen = false;
}
