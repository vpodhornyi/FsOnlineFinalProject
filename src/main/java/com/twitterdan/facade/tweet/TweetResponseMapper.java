package com.twitterdan.facade.tweet;

import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.dto.tweet.TweetResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetResponseMapper extends GeneralFacade<Tweet, TweetResponse> {
  public TweetResponseMapper() {
    super(Tweet.class, TweetResponse.class);
  }

  @Override
  public void decorateEntity(Tweet entity, TweetResponse dto) {

  }


}
