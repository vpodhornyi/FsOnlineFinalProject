package com.twitterdan.facade.tweet;

import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.dto.tweet.TweetRequest;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetRequestMapper extends GeneralFacade<Tweet, TweetRequest> {
  public TweetRequestMapper() {
    super(Tweet.class, TweetRequest.class);
  }

  @Override
  public void decorateEntity(Tweet entity, TweetRequest dto) {

  }
}
