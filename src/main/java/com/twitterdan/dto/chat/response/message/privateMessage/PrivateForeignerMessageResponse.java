package com.twitterdan.dto.chat.response.message.privateMessage;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateForeignerMessageResponse extends PrivateMessageResponseAbstract {
  private boolean IsForeignerMessage = true;
  private boolean IsMessageSeen = false;
}
