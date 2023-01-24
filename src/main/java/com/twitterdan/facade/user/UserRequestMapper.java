package com.twitterdan.facade.user;

import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.UserRequest;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@Service
public class UserRequestMapper extends GeneralFacade<User, UserRequest> {

  private final UserRepository userRepository;

  public UserRequestMapper(UserRepository userRepository) {
    super(User.class, UserRequest.class);
    this.userRepository = userRepository;
  }

  @Override
  protected void decorateEntity(User entity, UserRequest dto) {

    Random rand = new Random();
    int randomNumber = rand.nextInt(99);

    String userTagGenerate = dto.getName().toLowerCase() + dto.getBirthDate().getYear();
    Optional<User> optionalUser = userRepository.findByUserTag(userTagGenerate);

    if (optionalUser.isPresent()) {
      userTagGenerate = userTagGenerate + randomNumber;
    }

    entity.setUserTag(userTagGenerate);

    /*
     User user = new User();
      Optional<User> findUserByEmail = userRepository.findByEmail(signUpRequest.getEmail());
      if (findUserByEmail.isEmpty()) {
        Random rand = new Random();
    int randomNumber = rand.nextInt(99);
    String userTagGenerate = signUpRequest.getName().toLowerCase() + signUpRequest.getBirthDate().replaceAll("[\\s\\-()]", "");
    Optional<User> optionalUser = userRepository.findByUserTag(userTagGenerate);
    if (optionalUser.isPresent()) {
      userTagGenerate = userTagGenerate + randomNumber;
    }
      user.setEmail(signUpRequest.getEmail());
      user.setName(signUpRequest.getName());
      user.setBirthDate(signUpRequest.getBirthDate());
      user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
      user.setUserTag(userTagGenerate);
      userRepository.save(user);
      return "User was successfully registered";
    } else {
      throw new AccountAlreadyExistException(signUpRequest.getEmail());
    }
      }
     */
  }
}
