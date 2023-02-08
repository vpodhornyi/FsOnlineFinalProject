package com.twitterdan.controller;

import com.twitterdan.dao.UserDao;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.action.TweetActionRequest;
import com.twitterdan.dto.action.TweetActionResponseAllData;
import com.twitterdan.dto.tweet.TweetRequest;
import com.twitterdan.dto.tweet.TweetResponse;
import com.twitterdan.facade.tweet.TweetRequestMapper;
import com.twitterdan.facade.tweet.TweetResponseMapper;
import com.twitterdan.service.TweetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
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

  @GetMapping
  public List<TweetResponse> getAll(Principal principal,@RequestParam int  pageNumber,@RequestParam int pageSize) {
    User userCurrent  = userDao.findByUserTag(principal.getName());
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    Page<Tweet> tweets = tweetService.getAll(userCurrent.getId(),pageable);

    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  @GetMapping("/user-tweets/")
  public List<TweetResponse> getTweetsByUserId(
          @RequestParam (name = "userTag") String userTag
  ) {
    User user  = userDao.findByUserTag(userTag);
    List<Tweet> tweets = tweetService.getTweetsByUserId(user.getId());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }
  @GetMapping("/user-likes/")
  public List<TweetResponse> findCurrentUserLikeTweets(
          @RequestParam (name = "userTag") String userTag
  ) {
    User user  = userDao.findByUserTag(userTag);
    List<Tweet> tweets = tweetService.findCurrentUserLikeTweets(user.getId());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  @GetMapping("/replies/{id}")
  public List<TweetResponse> getReplies(@PathVariable("id") String tweetId) {
    List<Tweet> replies = tweetService.getReplies(Long.parseLong(tweetId));
    return replies.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  @GetMapping("/bookmarks")
  public List<TweetResponse> getBookmarks(Principal principal,@RequestParam int  pageNumber,@RequestParam int pageSize) {
    User user = userDao.findByUserTag(principal.getName());
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    Page<Tweet> tweets =  tweetService.getBookmarks(user.getId(),pageable);
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());

  }

  @GetMapping("/replies/{id}")
  public List<TweetResponse> getReplies(@PathVariable("id") String tweetId) {
    List<Tweet> replies = tweetService.getReplies(Long.parseLong(tweetId));
    return replies.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());


  }

  @GetMapping("/{id}")
  public TweetResponse getById(@PathVariable("id") String userId) throws Exception {
    Tweet tweet = tweetService.findById(Long.parseLong(userId));
    if (tweet.equals(new Tweet())) {
      throw new NullPointerException("There is no tweet with this id ");

    }
    return tweetResponseMapper.convertToDto(tweet);
  }

  @DeleteMapping("/{tweetId}")
  public void delete(Principal principal,@PathVariable(value = "tweetId") Long tweetId) throws Exception {
    User userCurrent  = userDao.findByUserTag(principal.getName());
    Tweet tweet = tweetService.findById(tweetId);
    if (tweet.equals(new Tweet())) {
      throw new Exception("The list has no element with this id");
    } else if (!tweet.getUser().equals(userCurrent)  ) {
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
                                                 Principal principal) {
    User user = userDao.findByUserTag(principal.getName());
    return tweetService.changeAction(tweetActionRequest, user);
  }

  @ExceptionHandler({Exception.class, MethodArgumentNotValidException.class})
  public ResponseEntity<Object> handleException(Exception ex) {
    return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
  }
}
