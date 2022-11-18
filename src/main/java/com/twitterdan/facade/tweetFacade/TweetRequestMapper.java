package com.twitterdan.facade.tweetFacade;


import com.twitterdan.domain.dto.tweetDto.TweetRequest;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetRequestMapper extends GeneralFacade<Tweet, TweetRequest> {
    public TweetRequestMapper() {
        super(Tweet.class, TweetRequest.class);
    }


    @Override
    protected void decorateEntity(Tweet entity, TweetRequest dto) {
    entity.setTweetType(TweetType.valueOf(dto.getTweetType()));


    }
}
