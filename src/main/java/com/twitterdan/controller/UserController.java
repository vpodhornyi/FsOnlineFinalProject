package com.twitterdan.controller;

import com.twitterdan.domain.user.User;
import com.twitterdan.service.UserService;
import com.twitterdan.service.auth.JwtAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/user")
@Validated
public class UserController {

  private final UserService userService;
  private final JwtAuthService jwtAuthService;

  @GetMapping
  public ResponseEntity<Object> getUser() {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    User user = userService.getByUserTag(userTag);

    return ResponseEntity.ok(user);
  }

  @GetMapping("/logout")
  public void logout() {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    jwtAuthService.deleteAllByLogin(userTag);
  }
}
