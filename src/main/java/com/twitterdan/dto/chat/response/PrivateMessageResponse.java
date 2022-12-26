package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.MessageSeenDto;
import lombok.Data;
import lombok.EqualsAndHashCode;


@EqualsAndHashCode(callSuper = true)
@Data
public class PrivateMessageResponse extends MessageResponseAbstract {
  private final boolean IsPrivateChat = true;
  private MessageSeenDto messageSeen;
}
