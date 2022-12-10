package com.twitterdan.dto.chat;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupChatResponse extends ChatResponseAbstract {
  private List<ChatUser> users;
}
