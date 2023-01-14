package com.twitterdan.dto.chat.response.message;

import java.util.List;

public class PageMessages {
  private int totalPages;
  private long totalElements;
  private Long lastSeenChatMessageId;
  private List<MessageResponseAbstract> messages;
}
