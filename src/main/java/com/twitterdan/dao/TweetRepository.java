package com.twitterdan.dao;

import com.twitterdan.domain.tweet.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {
    @Query(value = "SELECT TWEETS.*  FROM TWEETS Join TWEET_ACTIONS on TWEET_ACTIONS.TWEET_ID = TWEETS.ID \n"
            + " where TWEET_ACTIONS.ACTION_TYPE='LIKE' AND TWEET_ACTIONS.USER_ID = :userId", nativeQuery = true)
    List<Tweet> findCurrentUserLikeTweets( Long userId);
    List<Tweet>findTweetsByUserId(Long userId);
}
