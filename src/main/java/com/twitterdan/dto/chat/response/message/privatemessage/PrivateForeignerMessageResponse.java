package com.twitterdan.dto.chat.response.message.privatemessage;

import com.twitterdan.dto.chat.response.chat.PrivateChatResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateForeignerMessageResponse extends PrivateMessageResponseAbstract {
  private final boolean isForeignerMessage = true;
  private Integer countUnreadAllChatMessages = 0;
  private PrivateChatResponse chat;
}
