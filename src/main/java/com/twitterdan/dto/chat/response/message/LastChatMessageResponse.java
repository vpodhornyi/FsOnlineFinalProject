package com.twitterdan.dto.chat.response.message;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LastChatMessageResponse extends MessageResponseAbstract {
  private boolean isMessageSeen = false;
  private boolean isMessageOwner = false;
  private Integer countUnreadAllChatMessages = 0;
}
