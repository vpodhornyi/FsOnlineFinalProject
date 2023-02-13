package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.response.message.MessageResponseAbstract;
import com.twitterdan.dto.chat.response.seen.MessageOwnerSeenResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupMessageResponse extends MessageResponseAbstract {
  private final boolean isGroupChat = true;
  private List<MessageOwnerSeenResponse> messagesSeen;
}
