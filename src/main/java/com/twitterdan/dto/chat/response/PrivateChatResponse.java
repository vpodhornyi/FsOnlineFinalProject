package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PrivateChatResponse extends ChatResponseAbstract {
  private String avatarImgUrl;
  private String userTag;
  private ChatUser authUser;
  private ChatUser guestUser;
  private boolean IsPrivate = true;
}
