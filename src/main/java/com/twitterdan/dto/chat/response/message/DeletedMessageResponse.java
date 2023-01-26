package com.twitterdan.dto.chat.response.message;

import com.twitterdan.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeletedMessageResponse {
  private Long chatId;
  private Long messageId;
  private DtoResponseType type = DtoResponseType.MESSAGE_DELETE;
  private LastChatMessageResponse lastMessage;
}
