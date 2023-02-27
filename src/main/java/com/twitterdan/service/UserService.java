package com.twitterdan.service;

import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.notification.Notification;
import com.twitterdan.domain.notification.NotificationType;
import com.twitterdan.domain.user.User;
import com.twitterdan.exception.AccountAlreadyExistException;
import com.twitterdan.exception.CouldNotFindAccountException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  @Value("${genNotificationsDest}")
  private String genNotificationsDest;
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;


  public User findByUserTag(String userTag) {
    Optional<User> optionalUser = userRepository.findByUserTag(userTag);

    if (optionalUser.isPresent()) {


      Notification notification = new Notification()
              .setNotificationType(NotificationType.LOGGED_IN).setUserReceiver(optionalUser.get()).setUserInitiator(optionalUser.get()).setTweet(null).setRead(false);
      System.out.println("findByUserTag-> genNotificationsDest + optionalUser.get().getId(): "+ genNotificationsDest + optionalUser.get().getId());
      simpMessagingTemplate.convertAndSend(genNotificationsDest + optionalUser.get().getId(), notification);

      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
  }

}
