package com.twitterdan.dto.tweet;

import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.attachment.AttachmentResponse;
import com.twitterdan.dto.action.TweetActionResponse;
import lombok.Data;

import java.util.Set;

@Data

public class TweetResponse {
  private Long id;
  private String key;
  private String tweetType;
  private Set<AttachmentResponse> images;
  private Set<TweetActionResponse> actions;
  private Long parentTweetId;
  private String body;
  private Integer replyCounter;
  private String retweetFollowedName;
  private User user;

}
