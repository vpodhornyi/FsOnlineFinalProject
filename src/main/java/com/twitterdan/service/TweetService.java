package com.twitterdan.service;

import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.tweet.Tweet;
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


  public List<Tweet> getAll() {
    return tweetDao.findAll();
  }

  public Tweet save(Tweet tweet) {
    return tweetDao.save(tweet);
  }

  public void update(Tweet tweetUpdate) {
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


}
