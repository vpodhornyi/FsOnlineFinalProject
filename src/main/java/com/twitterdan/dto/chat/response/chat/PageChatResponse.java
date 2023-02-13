package com.twitterdan.dto.chat.response.chat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PageChatResponse {
  private int totalPages;
  private long totalElements;
  private List<ChatResponseAbstract> chats = new ArrayList<>();

  public void addChat(ChatResponseAbstract chat) {
    chats.add(chat);
  }
}
