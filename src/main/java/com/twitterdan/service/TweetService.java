package com.twitterdan.service;

import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.dto.tweet.TweetRequest;
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
            return (List<Tweet>) tweetDao.findAll();
        }

        public void save(Tweet tweet) {
            tweetDao.save(tweet);
        }
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

    }
