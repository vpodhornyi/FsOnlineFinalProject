package com.twitterdan.dto.chat.response.chat;

import com.twitterdan.dto.DtoResponseType;
import com.twitterdan.dto.chat.ChatUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddUsersToGroupResponse {
  private final DtoResponseType type = DtoResponseType.UPDATE_GROUP_CHAT;
  private Long chatId;
  private ChatUser user;
  private List<ChatUser> addedUsers;
}
