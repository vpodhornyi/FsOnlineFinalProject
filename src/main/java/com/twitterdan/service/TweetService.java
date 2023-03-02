package com.twitterdan.service;

import com.twitterdan.dao.TweetActionRepository;
import com.twitterdan.dao.TweetRepository;
import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.notification.Notification;
import com.twitterdan.domain.notification.NotificationType;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetAction;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.action.TweetActionRequest;
import com.twitterdan.dto.action.TweetActionResponseAllData;
import com.twitterdan.dto.tweet.TweetRequest;
import com.twitterdan.dto.tweet.TweetResponse;
import com.twitterdan.exception.CouldNotFindTweetException;
import com.twitterdan.exception.DeleteTweetException;
import com.twitterdan.facade.action.TweetActionResponseMapper;
import com.twitterdan.facade.tweet.TweetResponseMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class TweetService {
  @Autowired
  private TweetRepository tweetDao;
  @Autowired
  private TweetActionRepository tweetActionRepository;
  @Autowired
  private TweetResponseMapper tweetResponseMapper;
  @Autowired
  private TweetActionResponseMapper tweetActionResponseMapper;

  @Value("${genNotificationsDest}")
  private String genNotificationsDest;
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;
  @Autowired
  private UserService userService;

  public List<TweetResponse> getTweetsByUserId(Long userId) {
    List<Tweet> tweets = tweetDao.findCurrentUserActionTweets("RETWEET", userId);
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  public List<TweetResponse> findCurrentUserLikeTweets(Long userId) {
    List<Tweet> tweets = tweetDao.findCurrentUserLikeTweets(userId);
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }


  public List<TweetResponse> getAll(Long userId, Pageable pageable) {

    Optional<Page<Tweet>> optionalTweets = tweetDao.findFollowedTweetsAndRetweet(userId, pageable);
    Page<Tweet> tweets = optionalTweets.orElse(Page.empty());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());

  }

  public Tweet save(Tweet tweet) {
    //TODO  здесь создается новый твит

    String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    User user = userService.findByUserTagTrowException(principal);

    try {
      Notification notification = new Notification();
      notification.setNotificationType(NotificationType.NEW_TWEET);

      if(tweet.getRetweetUser()!=null){
        notification.setUserInitiator(tweet.getRetweetUser());
        System.out.print("initiatorUserId set to tweet.getRetweetUser(): "+notification.getUserInitiator());
      }
      if(tweet.getUser()!=null){
        notification.setUserInitiator(tweet.getUser());
        System.out.print("initiatorUserId set to tweet.getUser(): "+notification.getUserInitiator());
      }


      System.out.println("tweet notification created: " + notification);
    simpMessagingTemplate.convertAndSend(genNotificationsDest + user.getId(), notification);

    } catch (Exception e) {
      System.out.println("e.message: " + e.getMessage());
    }
    return tweetDao.save(tweet);
  }

  public List<TweetResponse> getBookmarks(Long userId, Pageable pageable) {
    Optional<Page<Tweet>> optionalTweets = tweetDao.findBookmarks(userId, pageable);
    Page<Tweet> tweets = optionalTweets.orElse(Page.empty());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }

  public List<TweetResponse> getTweetsAndRepliesByUserId(Long id) {
    List<Tweet> replies = tweetDao.findTweetsAndRepliesByUserId(id);
    return replies.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());

  }

  public List<TweetResponse> getReplies(Long id) {

    List<Tweet> replies = tweetDao.findReplies("REPLY", id);
    return replies.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());

  }

  ;

  public void update(TweetRequest tweetUpdate) {
    // TODO здесь изменяется твит
    System.out.println("in TweetService::update");
    System.out.println(tweetUpdate.getId());
    Tweet tweet = tweetDao.findById(tweetUpdate.getId()).get();
    tweet.setTweetType(tweetUpdate.getTweetType());
    tweet.setBody(tweetUpdate.getBody());
    tweet.setUser(tweetUpdate.getUser());

    Principal principal = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    System.out.println("in TweetService->   update.");
    Notification notification = new Notification()
            .setNotificationType(NotificationType.TWEET_UPDATE).setUserReceiver(tweet.getRetweetUser()).setUserInitiator(tweet.getRetweetUser()).setTweet(null).setRead(false);
    System.out.println("tweet notification created: " + notification);
//    simpMessagingTemplate.convertAndSend(genNotificationsDest + optionalUser.get().getId(), notification);
    System.out.println("Principal: " + principal);

    tweetDao.save(tweet);
  }

  public TweetResponse findById(Long userId) {

    Tweet tweet = tweetDao.findById(userId).orElse(new Tweet());
    if (tweet.equals(new Tweet())) {
      throw new CouldNotFindTweetException();

    }
    return tweetResponseMapper.convertToDto(tweet);
  }

  public void deleteById(Long id, User currentUser) throws Exception {
    TweetResponse tweetResponse = findById(id);
    if (! tweetResponse.getUser().equals(currentUser)) {
      throw new DeleteTweetException();
    } else {
      tweetDao.deleteById(id);

    }


  }

  public TweetActionResponseAllData changeAction(TweetActionRequest tweetActionRequest, User user) {
    //TODO здесь отправляется или отменяется ретвит
    Tweet tweet = tweetDao.findById(tweetActionRequest.getTweetId()).orElse(new Tweet());
    TweetAction newTweetAction = new TweetAction(tweetActionRequest.getActionType(), tweet, user);

    TweetAction resultFilter = tweet.getActions().stream()
            .filter(action -> action.getActionType().equals(tweetActionRequest.getActionType()) && action.getUser()
                    .getUserTag().equals(user.getUserTag())).findFirst().orElse(newTweetAction);

    if (! resultFilter.equals(newTweetAction)) {
      tweetActionRepository.deleteById(resultFilter.getId());
    } else {
      tweetActionRepository.save(newTweetAction);
    }
    return tweetActionResponseMapper.convertToDto(newTweetAction);
  }
}
