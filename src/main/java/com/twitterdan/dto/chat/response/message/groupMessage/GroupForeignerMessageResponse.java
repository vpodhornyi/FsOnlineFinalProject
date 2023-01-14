package com.twitterdan.dto.chat.response.message.groupMessage;

import com.twitterdan.dto.chat.response.chat.GroupChatResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupForeignerMessageResponse extends GroupMessageResponseAbstract {
  private final boolean IsForeignerMessage = true;
  private boolean IsMessageSeen = false;
  private Integer countUnreadAllChatMessages = 0;
  private GroupChatResponse chat;
}
