package com.twitterdan.dto.action;

import com.twitterdan.domain.tweet.ActionType;
import com.twitterdan.dto.tweet.TweetMinDataResponse;
import com.twitterdan.dto.user.UserMinDataResponse;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data

public class TweetActionResponseAllData {
  @Enumerated(EnumType.STRING)
  private ActionType actionType;
  private UserMinDataResponse user;
  private TweetMinDataResponse tweet;
}

