package com.twitterdan.service;

import com.twitterdan.dao.TweetDao;
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
        private TweetDao tweetDao;


        public List<Tweet> getAll() {
            return (List<Tweet>) tweetDao.findAll();
        }

        public void save(Tweet tweet) {
            tweetDao.save(tweet);
        }

        public Tweet findById(Long userId) {

            return tweetDao.findById(userId).orElse(new Tweet());

        }

        public void deleteById(Long id) {
            tweetDao.deleteById(id);


        }

    }
