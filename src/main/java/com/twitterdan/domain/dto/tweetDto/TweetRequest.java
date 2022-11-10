package com.twitterdan.domain.dto.tweetDto;

import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TweetRequest {

        private TweetType tweetType;
        private String body;
        private User user;

    @Override
    public String toString() {
        return "TweetRequest{" +
                "tweetType=" + tweetType +
                ", body='" + body + '\'' +
                ", user=" + user.getUserTag() +
                '}';
    }
}

