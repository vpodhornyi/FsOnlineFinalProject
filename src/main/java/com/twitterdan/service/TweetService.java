package com.twitterdan.service;

import com.twitterdan.dao.TweetActionRepository;
import com.twitterdan.dao.TweetRepository;
import com.twitterdan.dao.UserDao;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetAction;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.tweet.TweetRequest;
import com.twitterdan.dto.action.TweetActionRequest;
import com.twitterdan.dto.action.TweetActionResponseAllData;
import com.twitterdan.facade.action.TweetActionResponseMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
  @Autowired
  private UserDao userDao;

  public List<Tweet> getTweetsByUserId(Long userId) {
    return (List<Tweet>) tweetDao.findTweetsByUserId(userId);
  }
  public List<Tweet> findCurrentUserLikeTweets(Long userId) {
    return (List<Tweet>) tweetDao.findCurrentUserLikeTweets(userId);
  }

  public List<Tweet> getAll() {
    return (List<Tweet>) tweetDao.findAll();
  }

  public Tweet save(Tweet tweet) {
    return tweetDao.save(tweet);
  }

  public List<Long> getBookmarks() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String username = principal instanceof UserDetails
            ? ((UserDetails) principal).getUsername()
            : principal.toString();
    User user = userDao.findByUserTag(username);
    return tweetActionRepository.findBookmarks(user.getId(), "BOOKMARK");
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

  public TweetActionResponseAllData changeAction(TweetActionRequest tweetActionRequest) {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String username = principal instanceof UserDetails
            ? ((UserDetails) principal).getUsername()
            : principal.toString();

    Tweet tweet = tweetDao.findById(tweetActionRequest.getTweetId()).orElse(new Tweet());
    User user = userDao.findByUserTag(username);
    TweetAction newTweetAction = new TweetAction(tweetActionRequest.getActionType(), tweet, user);

    TweetAction resultFilter =
            tweet.getActions().stream().filter(action -> action.getActionType().equals(tweetActionRequest.getActionType())
                    && action.getUser().getUserTag().equals(username)
            ).findFirst().orElse(newTweetAction);

    if (!resultFilter.equals(newTweetAction)) {
      tweetActionRepository.deleteById(resultFilter.getId());
    } else {
      tweetActionRepository.save(newTweetAction);
    }
    return tweetActionResponseMapper.convertToDto(newTweetAction);
  }
}
