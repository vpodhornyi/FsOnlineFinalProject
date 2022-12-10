package com.twitterdan.dto.chat.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupChatRequest extends ChatRequestAbstract {
  private List<Long> usersIds;
}
