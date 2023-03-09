package com.twitterdan.service;

import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.user.CustomStyle;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.UserUpdateDataRequest;
import com.twitterdan.exception.AccountAlreadyExistException;
import com.twitterdan.exception.CouldNotFindAccountException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public Page<User> findAllNotFollowingUsers(Long userId, Pageable pageable) {
    return userRepository.findAllNotFollowingUsers(userId, pageable).orElse(Page.empty());
  }

  public User findById(Long id) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
  }

  public boolean updateUserProfile(Long id, UserUpdateDataRequest dto) {
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
      if (dtoBio != null) {
        user.get().setBio(dtoBio);
      }
      if (dtoLocation != null) {
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
  }

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

  public User createNewUser(User user) {
    Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

    if (optionalUser.isEmpty()) {
      return userRepository.save(user);
    }

    throw new AccountAlreadyExistException(user.getEmail());
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public Boolean deleteUserById(Long id) {
    userRepository.deleteById(id);
    return true;
  }

  public User findByUserTagTrowException(String userTag) {
    Optional<User> optionalUser = userRepository.findByUserTag(userTag);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
  }

  public User findByUserEmailTrowException(String email) {
    Optional<User> optionalUser = userRepository.findByEmail(email);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
  }

  public List<User> findByMatchesInNameOrUserTag(String text) {
    Optional<List<User>> optionalUsers = userRepository.findTop10ByMatchingNameOrUserTag(text);

    return optionalUsers.orElse(Collections.emptyList());
  }

  public CustomStyle updateCustomStyle(Long id, CustomStyle customStyle) {
    User user = findById(id);
    user.setCustomStyle(customStyle);
    User savedUser = userRepository.save(user);
    return savedUser.getCustomStyle();
  }
}
