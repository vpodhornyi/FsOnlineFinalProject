package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PrivateChatResponse extends ChatResponseAbstract {
  private String title;
  private ChatUser authUser;
  private ChatUser guestUser;
}
