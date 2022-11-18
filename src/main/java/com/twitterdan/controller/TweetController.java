package com.twitterdan.controller;

import com.twitterdan.facade.tweet.TweetRequestMapper;
import com.twitterdan.facade.tweet.TweetResponseMapper;
import com.twitterdan.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tweet")
@RequiredArgsConstructor
public class TweetController {
  private final TweetService tweetService;
  private final TweetRequestMapper tweetRequestMapper;
  private final TweetResponseMapper tweetResponseMapper;
}
