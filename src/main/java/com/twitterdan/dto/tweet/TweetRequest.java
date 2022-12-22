package com.twitterdan.dto.tweet;

import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.attachment.AttachmentRequest;
import com.twitterdan.dto.tweetaction.TweetActionRequest;
import lombok.Data;

import java.util.Set;

@Data
public class TweetRequest {
  private Long id;
  private TweetType tweetType;
  private Set<AttachmentRequest> images;
  private Set<TweetActionRequest> actions;
  private String body;
  private User user;
}
