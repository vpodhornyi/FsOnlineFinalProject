package com.twitterdan.dto.user;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserResponse {
  private Long id;
  private UUID key;
  private String name;
  private String userTag;
  private String email;
  private String bio;
  private String avatarImgUrl;
  private String headerImgUrl;
}
