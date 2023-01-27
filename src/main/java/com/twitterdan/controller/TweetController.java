package com.twitterdan.controller;

import com.twitterdan.dao.UserDao;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.tweet.TweetRequest;
import com.twitterdan.dto.tweet.TweetResponse;
import com.twitterdan.dto.action.TweetActionRequest;
import com.twitterdan.dto.action.TweetActionResponseAllData;
import com.twitterdan.facade.tweet.TweetRequestMapper;
import com.twitterdan.facade.tweet.TweetResponseMapper;
import com.twitterdan.service.TweetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.version}/tweets")
@Slf4j
public class TweetController {
  private final TweetService tweetService;
  private final TweetRequestMapper tweetRequestMapper;
  private final TweetResponseMapper tweetResponseMapper;
  @Autowired
  private UserDao userDao;

  public TweetController(TweetService tweetService, TweetRequestMapper tweetRequestMapper,
                         TweetResponseMapper tweetResponseMapper) {
    this.tweetService = tweetService;
    this.tweetRequestMapper = tweetRequestMapper;
    this.tweetResponseMapper = tweetResponseMapper;
  }


  @GetMapping
  public List<TweetResponse> getAll() {
    List<Tweet> tweets = tweetService.getAll();
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  @GetMapping("/user-tweets/")
  public List<TweetResponse> getTweetsByUserId(  Principal principal) {
    User userCurrent  = userDao.findByUserTag(principal.getName());
    List<Tweet> tweets = tweetService.getTweetsByUserId(userCurrent.getId());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }
  @GetMapping("/user-likes/")
  public List<TweetResponse> findCurrentUserLikeTweets(  Principal principal) {
    User userCurrent  = userDao.findByUserTag(principal.getName());
    List<Tweet> tweets = tweetService.findCurrentUserLikeTweets(userCurrent.getId());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  @GetMapping("/replies/{id}")
  public List<TweetResponse> getReplies(@PathVariable("id") String tweetId) {
    List<Tweet> replies = tweetService.getReplies(Long.parseLong(tweetId));
    return replies.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  @GetMapping("/bookmarks")
  public List<Long> getBookmarks() {
    return tweetService.getBookmarks();
  }

  @GetMapping("/{id}")
  public TweetResponse getById(@PathVariable("id") String userId, Principal principal) throws Exception {
    System.out.println(principal.getName());
    Tweet tweet = tweetService.findById(Long.parseLong(userId));
    if (tweet.equals(new Tweet())) {
      throw new NullPointerException("There is no tweet with this id ");

    }
    return tweetResponseMapper.convertToDto(tweet);
  }

  @DeleteMapping("/{userId}/{tweetId}")
  public void delete(@PathVariable(value = "userId") Long userId,
                     @PathVariable(value = "tweetId") Long tweetId) throws Exception {
    Tweet tweet = tweetService.findById(tweetId);
    if (tweet.equals(new Tweet())) {
      throw new Exception("The list has no element with this id");
    } else if (tweet.getUser().getId() != userId) {
      throw new Exception("This is not this user's tweet ");
    } else {
      tweetService.deleteById(tweetId);
    }
  }

  @PutMapping("/update")
  public void update(@Valid @RequestBody TweetRequest dto) {
    tweetService.update(dto);
  }

  @PostMapping("/create")
  public TweetResponse create(@RequestBody TweetRequest dto) {
    Tweet tweet = tweetRequestMapper.convertToEntity(dto);
    return tweetResponseMapper.convertToDto(tweetService.save(tweet));
  }

  @PostMapping("/change_actions")
  public TweetActionResponseAllData changeAction(@RequestBody TweetActionRequest tweetActionRequest,
                                                 @AuthenticationPrincipal User user) {
    return tweetService.changeAction(tweetActionRequest);
  }

  @ExceptionHandler({Exception.class, MethodArgumentNotValidException.class})
  public ResponseEntity<Object> handleException(Exception ex) {
    return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
  }
}
