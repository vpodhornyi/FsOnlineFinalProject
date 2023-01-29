package com.twitterdan.service;

import com.twitterdan.dao.TweetActionRepository;
import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetAction;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.tweet.TweetRequest;
import com.twitterdan.dto.action.TweetActionRequest;
import com.twitterdan.dto.action.TweetActionResponseAllData;
import com.twitterdan.facade.action.TweetActionResponseMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
public class TweetService {
  @Autowired
  private TweetRepository tweetDao;
  @Autowired
  private TweetActionRepository tweetActionRepository;
  @Autowired
  private TweetActionResponseMapper tweetActionResponseMapper;
  public List<Tweet> getTweetsByUserId(Long userId) {
     List<Tweet> userTweets = tweetDao.findTweetsByUserId(userId);
     List<Tweet> userRetweets =  tweetDao.findCurrentUserActionTweets("RETWEET",userId);
      userTweets.addAll(userRetweets);
      return userTweets;
  }
  public List<Tweet> findCurrentUserLikeTweets(Long userId) {
    return (List<Tweet>) tweetDao.findCurrentUserActionTweets("LIKE",userId);
  }


  public List<Tweet> getAll(Long userId) {
    return  tweetDao.findFollowedTweetsAndRetweet(userId);
  }

  public Tweet save(Tweet tweet) {
    return tweetDao.save(tweet);
  }

  public List<Long> getBookmarks(User user) {

    return tweetActionRepository.findBookmarks(user.getId(), "BOOKMARK");
  }
  public List<Tweet> getReplies(Long id) {

    return tweetDao.findReplies("REPLY",id );
  }
  ;

  public void update(TweetRequest tweetUpdate) {
    System.out.println(tweetUpdate.getId());
    Tweet tweet = tweetDao.findById(tweetUpdate.getId()).get();
    tweet.setTweetType(tweetUpdate.getTweetType());
    tweet.setBody(tweetUpdate.getBody());
    tweet.setUser(tweetUpdate.getUser());

    tweetDao.save(tweet);
  }

  public Tweet findById(Long userId) {

    return tweetDao.findById(userId).orElse(new Tweet());

  }

  public void deleteById(Long id) {
    tweetDao.deleteById(id);


  }

  public TweetActionResponseAllData changeAction(TweetActionRequest tweetActionRequest,User user) {
    Tweet tweet = tweetDao.findById(tweetActionRequest.getTweetId()).orElse(new Tweet());
    TweetAction newTweetAction = new TweetAction(tweetActionRequest.getActionType(), tweet, user);

    TweetAction resultFilter =
            tweet.getActions().stream().filter(action -> action.getActionType().equals(tweetActionRequest.getActionType())
                    && action.getUser().getUserTag().equals(user.getUserTag())
            ).findFirst().orElse(newTweetAction);

    if (!resultFilter.equals(newTweetAction)) {
      tweetActionRepository.deleteById(resultFilter.getId());
    } else {
      tweetActionRepository.save(newTweetAction);
    }
    return tweetActionResponseMapper.convertToDto(newTweetAction);
  }
}
