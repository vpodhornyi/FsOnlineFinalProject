package com.twitterdan.dto.chat.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PrivateChatRequest extends ChatRequestAbstract {
  private Long authUserId;
  private Long guestUserId;
}
