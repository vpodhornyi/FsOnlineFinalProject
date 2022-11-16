package com.twitterdan.dto.tweet;

import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetResponse {
  private TweetType tweetType;
  private String body;
  private User user;
}
