package com.twitterdan.dao;

import com.twitterdan.domain.tweet.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {
    @Query(value = "SELECT coalesce(max(id), 0) FROM Tweet ")
    public Long getMaxId();
}
