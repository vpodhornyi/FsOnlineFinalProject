package com.twitterdan.dao;

import com.twitterdan.domain.tweet.TweetAction;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TweetActionRepository extends JpaRepository<TweetAction, Long> {
}
