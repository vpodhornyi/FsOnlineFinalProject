package com.twitterdan.dto.user;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.dto.chat.response.ChatResponseAbstract;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class UserResponse {
  private Long id;
  private String key;
  private String name;
  private String userTag;
  private String email;
  private String bio;
  private String avatarImgUrl;
  private String headerImgUrl;
  private List<Long> chatsIds;
}
