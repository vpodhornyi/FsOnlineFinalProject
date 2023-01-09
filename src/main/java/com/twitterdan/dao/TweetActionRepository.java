package com.twitterdan.dao;

import com.twitterdan.domain.tweet.ActionType;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetAction;
import com.twitterdan.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TweetActionRepository extends JpaRepository<TweetAction, Long> {
}
