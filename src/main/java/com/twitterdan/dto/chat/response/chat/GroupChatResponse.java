package com.twitterdan.dto.chat.response.chat;

import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupChatResponse extends ChatResponseAbstract {
  private final DtoResponseType type = DtoResponseType.GROUP_CHAT;
  private List<ChatUser> users;
  private String avatarImgUrl;
  private final boolean isGroup = true;
}
