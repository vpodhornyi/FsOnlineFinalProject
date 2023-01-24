package com.twitterdan.service.auth;

import java.util.Optional;
import java.util.Random;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.signup.SignUpRequest;
import com.twitterdan.exception.AccountAlreadyExistException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignUpService {
  private final BCryptPasswordEncoder passwordEncoder;
  private final UserRepository userRepository;


  public String signup(SignUpRequest signUpRequest) {
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
//      user.setBirthDate(signUpRequest.getBirthDate());
      user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
      user.setUserTag(userTagGenerate);
      userRepository.save(user);
      return "User was successfully registered";
    } else {
      throw new AccountAlreadyExistException(signUpRequest.getEmail());
    }
      }
}
