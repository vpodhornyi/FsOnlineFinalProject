package com.twitterdan.dto.chat.response.chat;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupChatResponse extends ChatResponseAbstract {
  private List<ChatUser> users;
  private boolean IsGroup = true;
}
