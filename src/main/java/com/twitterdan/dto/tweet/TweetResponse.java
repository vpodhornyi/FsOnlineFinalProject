package com.twitterdan.dto.tweet;

import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data

public class TweetResponse {
  private Long id;
  private TweetType tweetType;
  private String body;
  private User user;

}
