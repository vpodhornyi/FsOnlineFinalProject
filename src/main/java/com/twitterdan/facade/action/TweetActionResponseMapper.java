package com.twitterdan.facade.action;

import com.twitterdan.domain.tweet.TweetAction;
import com.twitterdan.dto.action.TweetActionResponseAllData;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetActionResponseMapper extends GeneralFacade<TweetAction, TweetActionResponseAllData> {
  public TweetActionResponseMapper() {
    super(TweetAction.class, TweetActionResponseAllData.class);
  }


}
