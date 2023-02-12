package com.twitterdan.dao;

import com.twitterdan.domain.tweet.TweetAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TweetActionRepository extends JpaRepository<TweetAction, Long> {
  @Query(value = "select TWEET_ID  from TWEET_ACTIONS  where USER_ID =:id and ACTION_TYPE=:type", nativeQuery = true)
  List<Long> findBookmarks(Long id, String type);
}
