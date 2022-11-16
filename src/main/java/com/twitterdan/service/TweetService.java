package com.twitterdan.service;

import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.tweet.Tweet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
public class TweetService {
  @Autowired
  private TweetRepository tweetRepository;

  @Transactional(readOnly = true)
  public List<Tweet> getAllTweets() {
    return tweetRepository.findAll();
  }

}
