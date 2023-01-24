package com.twitterdan.controller;

import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.auth.AccountCheckResponse;
import com.twitterdan.domain.auth.AccountCheckRequest;
import com.twitterdan.domain.auth.JwtResponse;
import com.twitterdan.domain.auth.JwtRequest;
import com.twitterdan.domain.auth.RefreshJwtRequest;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.signup.SignUpRequest;
import com.twitterdan.dto.user.UserRequest;
import com.twitterdan.dto.user.UserResponse;
import com.twitterdan.facade.user.UserRequestMapper;
import com.twitterdan.facade.user.UserResponseMapper;
import com.twitterdan.service.UserService;
import com.twitterdan.service.auth.JwtAuthService;
import com.twitterdan.service.auth.SignUpService;

import lombok.RequiredArgsConstructor;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;


@RestController
@RequestMapping("${api.version}/auth")
@Validated
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
  private final JwtAuthService jwtAuthService;
  private final SignUpService signUpService;
  private final UserRequestMapper userRequestMapper;
  private final UserResponseMapper userResponseMapper;
  private final UserService userService;

  @Autowired
  PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  @PostMapping("/account")
  public ResponseEntity<AccountCheckResponse> account(@Valid @RequestBody AccountCheckRequest authRequest) {
    final AccountCheckResponse res = jwtAuthService.account(authRequest);

    return ResponseEntity.ok(res);
  }

  @PostMapping("/login")
  public ResponseEntity<JwtResponse> getAccessRefreshTokens(@Valid @RequestBody JwtRequest authRequest) {
    final JwtResponse res = jwtAuthService.login(authRequest);

    return ResponseEntity.ok(res);
  }

  @GetMapping("/logout")
  public void logout() {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    jwtAuthService.deleteAllByLogin(userTag);
  }

  @PostMapping("/access")
  public ResponseEntity<JwtResponse> getNewAccessToken(@RequestBody RefreshJwtRequest request) {
    final JwtResponse jwtResponse = jwtAuthService.getAccessToken(request.getRefreshToken());
    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping("/refresh")
  public ResponseEntity<JwtResponse> getNewRefreshToken(@RequestBody RefreshJwtRequest request) {
    final JwtResponse jwtResponse = jwtAuthService.refresh(request.getRefreshToken());
    return ResponseEntity.ok(jwtResponse);
  }

//  @PostMapping("/signup")
//  public ResponseEntity<HttpStatus> signup(@RequestBody SignUpRequest signUpRequest) {
//    this.signUpService.signup(signUpRequest);
//    return ResponseEntity.ok().build();
//  }

  @PostMapping("/signup")
  public ResponseEntity<UserResponse> signup(@RequestBody UserRequest userRequest) {
    User user = userService.createNewUser(userRequestMapper.convertToEntity(userRequest));
    return ResponseEntity.ok(userResponseMapper.convertToDto(user));
  }
}

