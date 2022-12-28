package com.twitterdan.dto.chat.response.chat;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateChatResponse extends ChatResponseAbstract {
  private String avatarImgUrl;
  private String userTag;
  private ChatUser authUser;
  private ChatUser guestUser;
  private final boolean IsPrivate = true;
}
