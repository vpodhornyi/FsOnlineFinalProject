package com.twitterdan.dto.chat.response.message.groupmessage;

import com.twitterdan.dto.chat.response.seen.MessageOwnerSeenResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupMessageOwnerResponse extends GroupMessageResponseAbstract {
  private final boolean isMessageOwner = true;
  private List<MessageOwnerSeenResponse> messagesSeen;
}
