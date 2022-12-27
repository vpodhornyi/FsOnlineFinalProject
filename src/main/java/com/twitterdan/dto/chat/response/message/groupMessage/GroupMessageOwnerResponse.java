package com.twitterdan.dto.chat.response.message.groupMessage;

import com.twitterdan.dto.chat.response.MessageSeenResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupMessageOwnerResponse extends GroupMessageResponseAbstract {
  private final boolean IsMessageOwner = true;
  private List<MessageSeenResponse> messagesSeen;
}
