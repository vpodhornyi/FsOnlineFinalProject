package com.twitterdan.dto.chat.response.seen;

import com.twitterdan.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForeignerMessageSeenResponse extends MessageSeenResponseAbstract {
  private final DtoResponseType type = DtoResponseType.FOREIGNER_MESSAGE_SEEN;
  private Integer countUnreadSelectedChatMessages = 0;
  private Integer countUnreadAllChatMessages = 0;
}
