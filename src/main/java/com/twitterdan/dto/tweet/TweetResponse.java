package com.twitterdan.dto.tweet;

import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Data

public class TweetResponse {
  private Long id;
  private String key;
  private TweetType tweetType;
  private String body;
  private User user;

}
