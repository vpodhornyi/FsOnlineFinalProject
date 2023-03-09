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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

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

  @GetMapping("/explore")
  public List<TweetResponse> getExploreTweets(@RequestParam int pageNumber, @RequestParam int pageSize) {
    return tweetService.findAllExplore(PageRequest.of(pageNumber, pageSize));
  }

  @GetMapping("/all")
  public List<TweetResponse> getAllTweets(Principal principal, @RequestParam int pageNumber, @RequestParam int pageSize) {
    User userCurrent = userDao.findByUserTag(principal.getName());
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    return tweetService.findAllTweetsUserIdIsNot(userCurrent.getId(), pageable);
  }

  @GetMapping
  public List<TweetResponse> getAll(Principal principal, @RequestParam int pageNumber, @RequestParam int pageSize) {
    User userCurrent = userDao.findByUserTag(principal.getName());
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    return tweetService.getAll(userCurrent.getId(), pageable);
  }

  @GetMapping("/user-tweets/")
  public List<TweetResponse> getTweetsByUserId(@RequestParam(name = "userTag") String userTag,
                                               @RequestParam int pageNumber,
                                               @RequestParam int pageSize
  ) {
    User user = userDao.findByUserTag(userTag);
    return tweetService.getTweetsAndRetweetsByUserId(user.getId(), PageRequest.of(pageNumber, pageSize));
  }

  @GetMapping("/user-likes/")
  public List<TweetResponse> findCurrentUserLikeTweets(@RequestParam(name = "userTag") String userTag,
                                                       @RequestParam int pageNumber,
                                                       @RequestParam int pageSize
  ) {
    User user = userDao.findByUserTag(userTag);
    return tweetService.getLikedTweetsByUserId(user.getId(), PageRequest.of(pageNumber, pageSize));

  }

  @GetMapping("/replies/")
  public List<TweetResponse> getRepliesByUserId(@RequestParam(name = "id") String userId,
                                                @RequestParam int pageNumber,
                                                @RequestParam int pageSize
  ) {
    return tweetService.getTweetsAndRepliesByUserId(Long.parseLong(userId), PageRequest.of(pageNumber, pageSize));
  }

  @GetMapping("/bookmarks")
  public List<TweetResponse> getBookmarks(Principal principal, @RequestParam int pageNumber, @RequestParam int pageSize) {
    User user = userDao.findByUserTag(principal.getName());
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    return tweetService.getBookmarks(user.getId(), pageable);

  }

  @GetMapping("/replies/{id}")
  public List<TweetResponse> getReplies(@PathVariable("id") String tweetId) {
    return tweetService.getReplies(Long.parseLong(tweetId));
  }

  @GetMapping("/{id}")
  public TweetResponse getById(@PathVariable("id") String userId) throws Exception {
    return tweetService.findById(Long.parseLong(userId));
  }

  @DeleteMapping("/{tweetId}")
  public void delete(Principal principal, @PathVariable(value = "tweetId") Long tweetId) throws Exception {
    User userCurrent = userDao.findByUserTag(principal.getName());
    tweetService.deleteById(tweetId, userCurrent);
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
  public TweetActionResponseAllData changeAction(@RequestBody TweetActionRequest tweetActionRequest, Principal principal) {
    User user = userDao.findByUserTag(principal.getName());
    return tweetService.changeAction(tweetActionRequest, user);
  }
}
