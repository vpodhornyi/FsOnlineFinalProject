package com.twitterdan.facade.tweetAction;

import com.twitterdan.domain.tweet.TweetAction;
import com.twitterdan.dto.tweetAction.TweetActionRequest;
import com.twitterdan.dto.tweetAction.TweetActionResponse;
import com.twitterdan.dto.tweetAction.TweetActionResponseAllData;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetActionResponseMapper extends GeneralFacade<TweetAction, TweetActionResponseAllData> {
  public TweetActionResponseMapper() {
    super(TweetAction.class, TweetActionResponseAllData.class);
  }


}
