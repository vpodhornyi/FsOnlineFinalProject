package com.twitterdan.service;

import com.twitterdan.dao.UserDao;
import com.twitterdan.domain.notification.Notification;
import com.twitterdan.domain.notification.NotificationType;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowerService {
  private final UserDao userDao;

  @Value("${genNotificationsDest}")
  private String genNotificationsDest;
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;
  @Autowired
  private UserService userService;

  private  void postFollowNotification(Long followingUserId, Long followedUserId, NotificationType type){
    User follower = userService.findById(followingUserId);
    User followed = userService.findById(followedUserId);

    try {
      Notification notification = new Notification();
      notification.setNotificationType(type);
      notification.setUserInitiator(follower);
      notification.setUserReceiver(followed);


      simpMessagingTemplate.convertAndSend(genNotificationsDest + followingUserId, notification);
      simpMessagingTemplate.convertAndSend(genNotificationsDest + followedUserId, notification);

    } catch (RuntimeException e) {
      log.error("FollowerService::postFollowNotification()-> error creating a notification: " + e.getMessage());
    }
  }

  public boolean followUser(Long userId, Long userToFollowId) {
    Optional<User> user = userDao.findById(userId);
    Optional<User> userToFollow = userDao.findById(userToFollowId);

    if (user.isPresent() && userToFollow.isPresent()) {
      user.get().getFollowings().add(userToFollow.get());
      userDao.save(user.get());
      postFollowNotification(userId, userToFollowId, NotificationType.FOLLOW);
      return true;
    }

    return false;
  }

  public boolean unfollowUser(Long userId, Long userToUnfollowId) {
    Optional<User> user = userDao.findById(userId);
    Optional<User> userToUnfollow = userDao.findById(userToUnfollowId);

    if (userToUnfollow.isPresent() && user.isPresent()) {
      user.get().getFollowings().remove(userToUnfollow.get());
      userDao.save(user.get());
      postFollowNotification(userId, userToUnfollowId, NotificationType.UNFOLLOW);
      return true;
    }

    return false;
  }
}
