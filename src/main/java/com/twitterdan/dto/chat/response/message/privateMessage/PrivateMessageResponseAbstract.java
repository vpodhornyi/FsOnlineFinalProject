package com.twitterdan.dto.chat.response.message.privateMessage;

import com.twitterdan.dto.chat.response.message.MessageResponseAbstract;

public abstract class PrivateMessageResponseAbstract extends MessageResponseAbstract {
  private final boolean isPrivateChat = true;
}
