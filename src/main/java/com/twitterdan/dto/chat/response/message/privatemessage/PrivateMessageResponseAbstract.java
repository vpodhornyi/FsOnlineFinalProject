package com.twitterdan.dto.chat.response.message.privatemessage;

import com.twitterdan.dto.chat.response.message.MessageResponseAbstract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class PrivateMessageResponseAbstract extends MessageResponseAbstract {
  private final boolean isPrivateChat = true;
  private boolean isMessageSeen = false;
}
