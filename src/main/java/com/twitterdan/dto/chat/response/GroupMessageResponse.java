package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.MessageSeenDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Data
public class GroupMessageResponse extends MessageResponseAbstract {
  private final boolean IsGroupChat = true;
  private List<MessageSeenDto> messagesSeen;
  private MessageSeenDto messageSeen;
}
