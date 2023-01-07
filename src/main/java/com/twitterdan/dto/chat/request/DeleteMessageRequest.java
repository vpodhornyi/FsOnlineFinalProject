package com.twitterdan.dto.chat.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DeleteMessageRequest {
  private Long chatId;
  private Long messageId;
  private boolean deleteForYou;
  private boolean deleteForAll;
}
