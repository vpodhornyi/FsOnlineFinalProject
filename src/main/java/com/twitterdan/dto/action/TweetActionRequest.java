package com.twitterdan.dto.action;

import com.twitterdan.domain.tweet.ActionType;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data

public class TweetActionRequest {
  private @Enumerated(EnumType.STRING) ActionType actionType;
  private Long tweetId;

}
