package com.twitterdan.dto.tweet;

import com.twitterdan.domain.attachment.AttachmentImage;
import com.twitterdan.domain.tweet.TweetType;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.attachment.AttachmentResponse;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Set;
import java.util.UUID;

@Data

public class TweetResponse {
  private Long id;
  private String key;
  private TweetType tweetType;
  private Set<AttachmentResponse> images;

  private String body;
  private User user;

}
