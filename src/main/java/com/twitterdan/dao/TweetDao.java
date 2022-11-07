package com.twitterdan.dao;

import com.twitterdan.domain.tweet.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TweetDao extends JpaRepository<Tweet, Long> {
    Optional<Tweet> findAccountByNumber(String accountNumber);
}