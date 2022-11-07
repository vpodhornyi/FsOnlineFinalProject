package com.twitterdan.domain.dto.tweetDto;

import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;

public class TweetResponse {
    private TweetType tweetType;
    private String body;
    private User user;
}
