package com.twitterdan.dto.tweet;

import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.attachment.AttachmentResponse;
import com.twitterdan.dto.tweetaction.TweetActionResponse;
import lombok.Data;

import java.util.Set;

@Data

public class TweetResponse {
  private Long id;
  private String key;
  private TweetType tweetType;
  private Set<AttachmentResponse> images;
  private Set<TweetActionResponse> actions;

  private String body;
  private User user;

}
