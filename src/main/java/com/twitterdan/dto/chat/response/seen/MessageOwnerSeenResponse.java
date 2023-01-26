package com.twitterdan.dto.chat.response.seen;

import com.twitterdan.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageOwnerSeenResponse extends MessageSeenResponseAbstract {
  private final DtoResponseType type = DtoResponseType.MESSAGE_OWNER_SEEN;
}
