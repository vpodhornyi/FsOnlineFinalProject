package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.ChatUser;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupChatResponse extends ChatResponseAbstract {
  private List<ChatUser> users;
  private boolean IsGroup = true;
}
