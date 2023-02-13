package com.twitterdan.dto.chat.response.message.privatemessage;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateMessageOwnerResponse extends PrivateMessageResponseAbstract {
  private final boolean isMessageOwner = true;
}
