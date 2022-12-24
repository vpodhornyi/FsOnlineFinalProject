package com.twitterdan.dto.chat.response;

import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.dto.chat.MessageSeenDto;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class MessageResponse {
  private Long id;
  private String key;
  private String text;
  private LocalDateTime createdAt;
  private Long chatId;
  private ChatUser user;
  private List<MessageSeenDto> seen;
}
