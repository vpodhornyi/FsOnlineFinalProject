package com.twitterdan.dto.chat.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AddUsersToGroupRequest {
  Long chatId;
  List<Long> usersIds;
}
