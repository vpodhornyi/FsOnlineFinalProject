package com.twitterdan.dto.tweetaction;

import com.twitterdan.domain.tweet.ActionType;
import com.twitterdan.domain.user.User;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
public class TweetActionResponse {
  @Enumerated(EnumType.STRING)
  private ActionType actionType;
  private User user;
}
