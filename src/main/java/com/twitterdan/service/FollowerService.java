package com.twitterdan.service;

import com.twitterdan.dao.UserDao;
import com.twitterdan.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowerService {
  private final UserDao userDao;

  public boolean followUser(Long userId, Long userToFollowId) {
    Optional<User> user = userDao.findById(userId);
    Optional<User> userToFollow = userDao.findById(userToFollowId);

    if (user.isPresent() && userToFollow.isPresent()) {
      user.get().getFollowings().add(userToFollow.get());
      userDao.save(user.get());
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
      return true;
    }

    return false;
  }
}
