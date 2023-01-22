package com.twitterdan.dto.tweet;

import com.twitterdan.domain.attachment.AttachmentImage;
import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Data
public class TweetRequest {
  private Long id;
  private TweetType tweetType;
  private ArrayList<String> images;
  private Long parentTweetId;
  private String body;
  private User user;
}
