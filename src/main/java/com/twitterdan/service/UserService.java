package com.twitterdan.service;

import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User createNewUser(User user) throws Exception {
    if (userRepository.findByEmail(user.getEmail()) != null) {
      throw new Exception("User already exists!");
    } else {
      return userRepository.save(user);
    }
  }

  public List<User> getAll() {
    return userRepository.findAll();
  }

  public User updateUser(User user) {
    return userRepository.save(user);
  }

  public User findById(Long id) {
    return userRepository.findById(id).orElse(new User());
  }

  public Boolean deleteUserById(Long id) {
    userRepository.deleteById(id);
    return true;
  }
}
