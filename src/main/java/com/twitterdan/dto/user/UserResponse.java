package com.twitterdan.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.twitterdan.utils.DateSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
  private Long id;
  private String key;
  private String name;
  private String userTag;
  private String email;
//  @JsonSerialize(using = DateSerializer.class)
  private String birthDate;
  private String bio;
  private String location;
  private String avatarImgUrl;
  private String headerImgUrl;
  @JsonProperty("followers")
  private Set<String> followersTags = new HashSet<>();
  @JsonProperty("followings")
  private Set<String> followingsTags = new HashSet<>();
  @JsonProperty("tweets")
  private Set<Long> tweetsIds = new HashSet<>();
  private Integer countUnreadMessages = 0;

  @Override
  public String toString() {
    return "UserResponse{" +
            "id=" + id +
            ", key='" + key + '\'' +
            ", name='" + name + '\'' +
            ", userTag='" + userTag + '\'' +
            ", email='" + email + '\'' +
            ", birthDate=" + birthDate +
            ", bio='" + bio + '\'' +
            ", location='" + location + '\'' +
            ", avatarImgUrl='" + avatarImgUrl + '\'' +
            ", headerImgUrl='" + headerImgUrl + '\'' +
            ", followersTags=" + followersTags +
            ", followingsTags=" + followingsTags +
            ", tweetsIds=" + tweetsIds +
            ", countUnreadMessages=" + countUnreadMessages +
            '}';
  }
}
