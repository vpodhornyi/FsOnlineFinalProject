package com.twitterdan.dto.chat.response.message.groupmessage;

import com.twitterdan.dto.chat.response.chat.GroupChatResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupForeignerMessageResponse extends GroupMessageResponseAbstract {
  private final boolean isForeignerMessage = true;
  private boolean isMessageSeen = false;
  private Integer countUnreadAllChatMessages = 0;
  private GroupChatResponse chat;
}
