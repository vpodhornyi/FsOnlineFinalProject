package com.twitterdan.dto.chat.response.chat;

import com.twitterdan.dto.DtoResponseType;
import com.twitterdan.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class LeaveChatResponse {
  private Long chatId;
  private ChatUser user;
  private final String key = UUID.randomUUID().toString();
  private final boolean isLeaveChat = true;
  private final DtoResponseType type = DtoResponseType.LEAVE_CHAT;
  private Integer countUnreadAllChatMessages = 0;
}
