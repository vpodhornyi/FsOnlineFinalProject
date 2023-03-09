package com.twitterdan.service;

import com.twitterdan.dao.TweetActionRepository;
import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetAction;
import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.action.TweetActionRequest;
import com.twitterdan.dto.action.TweetActionResponseAllData;
import com.twitterdan.dto.tweet.TweetRequest;
import com.twitterdan.dto.tweet.TweetResponse;
import com.twitterdan.exception.CouldNotFindTweetException;
import com.twitterdan.exception.DeleteTweetException;
import com.twitterdan.facade.action.TweetActionResponseMapper;
import com.twitterdan.facade.tweet.TweetResponseMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class TweetService {
  @Autowired
  private TweetRepository tweetDao;
  @Autowired
  private TweetActionRepository tweetActionRepository;
  @Autowired
  private TweetResponseMapper tweetResponseMapper;
  @Autowired
  private TweetActionResponseMapper tweetActionResponseMapper;

  public List<TweetResponse> getTweetsAndRetweetsByUserId(Long userId, Pageable pageable) {
    Page<Tweet> tweets = tweetDao.findCurrentUserActionTweets("RETWEET",userId, pageable).orElse(Page.empty());
    try {
      return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
    } catch (DataAccessException dae) {
      return Collections.emptyList();
    }
  }

  public List<TweetResponse> getLikedTweetsByUserId(Long userId, Pageable pageable) {
    Page<Tweet> tweets = tweetDao.findCurrentUserLikeTweets(userId, pageable).orElse(Page.empty());

    try {
      return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
    } catch (DataAccessException dae) {
      return Collections.emptyList();
    }
  }

  public List<TweetResponse> getTweetsAndRepliesByUserId(Long id, Pageable pageable) {
    Page<Tweet> replies = tweetDao.findTweetsByUserId(id, pageable).orElse(Page.empty());

    try {
      return replies.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
    } catch (DataAccessException dae) {
      return Collections.emptyList();
    }

  }

  public List<TweetResponse> getAll(Long userId, Pageable pageable) {
    Optional<Page<Tweet>> optionalTweets = tweetDao.findFollowedTweetsAndRetweet(userId, pageable);
    Page<Tweet> tweets = optionalTweets.orElse(Page.empty());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  public Tweet save(Tweet tweet) {
    return tweetDao.save(tweet);
  }

  public List<TweetResponse> getBookmarks(Long userId, Pageable pageable) {
    Optional<Page<Tweet>> optionalTweets = tweetDao.findBookmarks(userId, pageable);
    Page<Tweet> tweets = optionalTweets.orElse(Page.empty());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  public List<TweetResponse> getReplies(Long id) {

    List<Tweet> replies = tweetDao.findTweetsByTweetTypeAndParentTweetId(TweetType.REPLY, id);
    return replies.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());

  }

  ;

  public void update(TweetRequest tweetUpdate) {
    Tweet tweet = tweetDao.findById(tweetUpdate.getId()).get();
    tweet.setTweetType(tweetUpdate.getTweetType());
    tweet.setBody(tweetUpdate.getBody());
    tweet.setUser(tweetUpdate.getUser());

    tweetDao.save(tweet);
  }

  public TweetResponse findById(Long userId) {

    Tweet tweet = tweetDao.findById(userId).orElse(new Tweet());
    if (tweet.equals(new Tweet())) {
      throw new CouldNotFindTweetException();

    }
    return tweetResponseMapper.convertToDto(tweet);
  }

  public void deleteById(Long id, User currentUser) throws Exception {
    TweetResponse tweetResponse = findById(id);

    if (! tweetResponse.getUser().equals(currentUser)) {
      throw new DeleteTweetException();
    } else {
      tweetDao.deleteById(id);
    }
  }

  public TweetActionResponseAllData changeAction(TweetActionRequest tweetActionRequest, User user) {
    Tweet tweet = tweetDao.findById(tweetActionRequest.getTweetId()).orElse(new Tweet());
    TweetAction newTweetAction = new TweetAction(tweetActionRequest.getActionType(), tweet, user);

    TweetAction resultFilter = tweet.getActions().stream()
            .filter(action -> action.getActionType().equals(tweetActionRequest.getActionType()) && action.getUser()
                    .getUserTag().equals(user.getUserTag())).findFirst().orElse(newTweetAction);

    if (! resultFilter.equals(newTweetAction)) {
      tweetActionRepository.deleteById(resultFilter.getId());
    } else {
      tweetActionRepository.save(newTweetAction);
    }
    return tweetActionResponseMapper.convertToDto(newTweetAction);
  }

  public List<TweetResponse> findAllTweetsUserIdIsNot(Long userId, Pageable pageable) {
    Optional<Page<Tweet>> optionalTweets = Optional.ofNullable(tweetDao.findAllByUserIdIsNot(userId, pageable));
    Page<Tweet> tweets = optionalTweets.orElse(Page.empty());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  public List<TweetResponse> findAllExplore(Pageable pageable) {
    Page<Tweet> tweets = Optional.ofNullable(tweetDao.findAll(pageable)).orElse(Page.empty());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }
}