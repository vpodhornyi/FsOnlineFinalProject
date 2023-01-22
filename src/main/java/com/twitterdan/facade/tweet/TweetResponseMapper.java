package com.twitterdan.facade.tweet;

import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.dto.tweet.TweetResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TweetResponseMapper extends GeneralFacade<Tweet, TweetResponse> {
  @Autowired
  private TweetRepository tweetDao;
  public TweetResponseMapper() {
    super(Tweet.class, TweetResponse.class);
  }

  @Override
  protected void decorateDto(TweetResponse dto, Tweet entity) {
    Integer replyCounter = tweetDao.findReplies("REPLY",entity.getId()).size();
    dto.setReplyCounter(replyCounter);
    Long parentValue = dto.getTweetType().equals("TWEET")?null:entity.getId();
    entity.setParentTweetId(parentValue);
    super.decorateDto(dto, entity);

  }



  @Override
  public void decorateEntity(Tweet entity, TweetResponse dto) {


    Long parentValue = dto.getTweetType().equals("TWEET")?null:entity.getId();
    entity.setParentTweetId(parentValue);
  }


}
