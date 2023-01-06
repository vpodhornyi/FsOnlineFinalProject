package com.twitterdan.dto.chat.response.message;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LastChatMessageResponse extends MessageResponseAbstract {
  private boolean IsMessageSeen = false;
  private boolean IsMessageOwner = false;
  private Integer countUnreadAllChatMessages = 0;
}
