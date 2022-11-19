package com.twitterdan.dto.follower;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowerResponse {
  private Long id;
  private String name;
  private String avatarImgUrl;
}
