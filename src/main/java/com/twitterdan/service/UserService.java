package com.twitterdan.service;

import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.user.User;
import com.twitterdan.exception.CouldNotFindAccountException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  @Transactional(readOnly = true)
  public List<User> findAll() {
    return userRepository.findAll();
  }

  @Transactional(readOnly = true)
  public User findById(Long id) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
  }

  @Transactional(readOnly = true)
  public User findByUserTag(String userTag) {
    return userRepository.findByUserTag(userTag);
  }

/*  public boolean updateUserProfile(Long id, UserProfileUpdateRequestDto dto) {
    Optional<User> user = userRepository.findById(id);

    String dtoName = dto.getName();
    String dtoBio = dto.getBio();
    String dtoLocation = dto.getLocation();
    String dtoBirth = dto.getBirth();
    String dtoHeaderImgUrl = dto.getHeaderImgUrl();

    if (user.isPresent()) {
      if (dtoName != null && dtoName.length() > 0) {
        user.get().setName(dtoName);
      }
      if (dtoBio != null && dtoBio.length() > 0) {
        user.get().setBio(dtoBio);
      }
      if (dtoLocation != null && dtoLocation.length() > 0) {
        user.get().setLocation(dtoLocation);
      }

      if (dtoBirth != null && dtoBirth.length() > 4) {
        LocalDate date = LocalDate.parse(dtoBirth);
        user.get().setBirthDate(date);
      }

      if (dtoHeaderImgUrl != null && dtoHeaderImgUrl.length() == 0) {
        user.get().setHeaderImgUrl("");
      }

      userRepository.save(user.get());
      return true;
    }

    return false;
  }*/

  public void updateUserHeader(Long id, String headerImgUrl) {
    Optional<User> user = userRepository.findById(id);

    if (user.isPresent()) {
      user.get().setHeaderImgUrl(headerImgUrl);
      userRepository.save(user.get());
    }

  }

  public void updateUserAvatar(Long id, String avatarImgUrl) {
    Optional<User> user = userRepository.findById(id);

    if (user.isPresent()) {
      user.get().setAvatarImgUrl(avatarImgUrl);
      userRepository.save(user.get());
    }

  }

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

  public Boolean deleteUserById(Long id) {
    userRepository.deleteById(id);
    return true;
  }

  public User getByUserTag(String userTag) {
    return userRepository.findByUserTag(userTag);
  }

  public User getByEmail(String email) {
    return userRepository.findByUserTag(email);
  }

  public List<User> findByMatchesInNameOrUserTag(String text) {
    Optional<List<User>> optionalUsers = userRepository.findByMatchingNameOrUserTag(text);

    return optionalUsers.orElse(Collections.emptyList());
  }
}
