package com.twitterdan.service;

import com.twitterdan.dao.AttachmentRepository;
import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.attachment.AttachmentImage;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.tweet.TweetRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@Slf4j
public class TweetService {
        @Autowired
        private AttachmentRepository imagesDao;
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
    public void updateTweetImages(Long id, String tweetImgUrl) {

        Optional<Tweet> tweet = tweetDao.findById(id);

        if (tweet.isPresent()) {
            Tweet validTweet = tweet.get();
            Set<AttachmentImage> images= validTweet.getImages();
            AttachmentImage newImageTweet = new AttachmentImage(tweetImgUrl,validTweet);
            imagesDao.save(newImageTweet);
            images.add(newImageTweet);
            validTweet.setImages(images);
            tweetDao.save(validTweet);
        }

    }

    }
