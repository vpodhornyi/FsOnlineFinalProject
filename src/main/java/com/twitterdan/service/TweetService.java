package com.twitterdan.service;

import com.twitterdan.dao.TweetActionRepository;
import com.twitterdan.dao.TweetRepository;
import com.twitterdan.domain.notification.Notification;
import com.twitterdan.domain.notification.NotificationType;
import com.twitterdan.domain.tweet.ActionType;
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

    private void postTweetNotification(Tweet tweet, NotificationType type) {

        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByUserTagTrowException(principal);

        try {
            Notification notification = new Notification();
            notification.setNotificationType(type);
            notification.setUserInitiator(user);

            if (tweet.getUser() != null) {
                notification.setUserReceiver(tweet.getUser());
            }

            String destination = genNotificationsDest + user.getId();
            simpMessagingTemplate.convertAndSend(destination, notification);
            destination = genNotificationsDest + notification.getUserReceiver().getId();
            simpMessagingTemplate.convertAndSend(destination, notification);

        } catch (RuntimeException e) {
            log.error("TweetService::postTweetNotification()-> error creating a notification: " + e.getMessage());
        }
    }


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
        postTweetNotification(tweet, NotificationType.NEW_TWEET);
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

    public void update(TweetRequest tweetUpdate) {
        Tweet tweet = tweetDao.findById(tweetUpdate.getId()).get();
        tweet.setTweetType(tweetUpdate.getTweetType());
        tweet.setBody(tweetUpdate.getBody());
        tweet.setUser(tweetUpdate.getUser());
        postTweetNotification(tweet, NotificationType.TWEET_UPDATE);
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

    NotificationType type = null;
    if (tweetActionRequest.getActionType() == ActionType.LIKE) {
      type = NotificationType.LIKE;
    } else if (tweetActionRequest.getActionType() == ActionType.RETWEET) {
      type = NotificationType.RETWEET;
    } else if (tweetActionRequest.getActionType() == ActionType.BOOKMARK) {
      type = NotificationType.BOOKMARK;
    }
    postTweetNotification(tweet, type);
    return tweetActionResponseMapper.convertToDto(newTweetAction);
  }

  public List<TweetResponse> findAllTweetsUserIdIsNot(Long userId, Pageable pageable) {
    Optional<Page<Tweet>> optionalTweets = Optional.ofNullable(tweetDao.findAllByUserIdIsNot(userId, pageable));
    Page<Tweet> tweets = optionalTweets.orElse(Page.empty());
    return tweets.stream().map(tweetResponseMapper::convertToDto).collect(Collectors.toList());
  }
}