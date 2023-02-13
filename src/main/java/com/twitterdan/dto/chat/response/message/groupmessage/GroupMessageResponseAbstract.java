package com.twitterdan.dto.chat.response.message.groupmessage;

import com.twitterdan.dto.chat.response.message.MessageResponseAbstract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class GroupMessageResponseAbstract extends MessageResponseAbstract {
  private final boolean isGroupChat = true;
}
