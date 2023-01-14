package com.twitterdan.dto.chat.response.message;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PageMessagesResponse {
  private Long chatId;
  private int totalPages;
  private long totalElements;
  private Long lastSeenChatMessageId;
  private List<MessageResponseAbstract> messages = new ArrayList<>();

  public void addMessage(MessageResponseAbstract message) {
    messages.add(message);
  }
}
