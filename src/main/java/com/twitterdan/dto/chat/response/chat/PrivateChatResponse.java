package com.twitterdan.dto.chat.response.chat;

import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateChatResponse extends ChatResponseAbstract {
  private final DtoResponseType type = DtoResponseType.PRIVATE_CHAT;
  private String avatarImgUrl;
  private String userTag;
  private ChatUser authUser;
  private ChatUser guestUser;
  private final boolean isPrivate = true;
}
