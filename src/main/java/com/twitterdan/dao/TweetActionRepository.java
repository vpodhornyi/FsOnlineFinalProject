package com.twitterdan.dao;

import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TweetActionRepository extends JpaRepository<TweetAction, Long> {
  @Query(value = "select tweets.* from tweets JOIN tweet_actions ON tweets.id = tweet_actions.tweet_id  WHERE  tweet_actions"
          + ".user_id =:userId  AND  tweet_actions.action_type=:type", nativeQuery = true)
  List<Tweet> findBookmarks(Long userId, String type);
}
