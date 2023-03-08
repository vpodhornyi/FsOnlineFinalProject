package com.twitterdan.facade.tweet;

import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.tweet.TweetResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TweetResponseMapper extends GeneralFacade<Tweet, TweetResponse> {
  @Autowired
  private TweetRepository tweetDao;

  public TweetResponseMapper() {
    super(Tweet.class, TweetResponse.class);
  }

  @Override
  protected void decorateDto(TweetResponse dto, Tweet entity) {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String userTag = principal instanceof UserDetails
            ? ((UserDetails) principal).getUsername()
            : principal.toString();
    User retweetUser = entity.getRetweetUser();
    String name = Optional.ofNullable(retweetUser).map(userRetweet -> {
      String retweetName = userRetweet.getUserTag().equals(userTag) ? "You" : userRetweet.getName();
      return retweetName + " Retweeted";

    }).orElse("");

    dto.setRetweetFollowedName(name);

    Integer replyCounter = tweetDao.findTweetsByTweetTypeAndParentTweetId(TweetType.REPLY, entity.getId()).size();
    dto.setReplyCounter(replyCounter);


  }


  @Override
  public void decorateEntity(Tweet entity, TweetResponse dto) {
    Long parentValue = dto.getTweetType().equals("TWEET") ? null : entity.getId();
    entity.setParentTweetId(parentValue);
  }


}
