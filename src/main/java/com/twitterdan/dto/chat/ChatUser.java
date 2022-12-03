package com.twitterdan.dto.chat;

import lombok.Data;

@Data
public class ChatUser {
  private Long id;
  private String key;
  private String name;
  private String userTag;
  private String avatarImgUrl;
}
