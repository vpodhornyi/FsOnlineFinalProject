package com.twitterdan.controller;

import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.UserResponse;
import com.twitterdan.facade.user.UserRequestMapper;
import com.twitterdan.facade.user.UserResponseMapper;
import com.twitterdan.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final UserRequestMapper userRequestMapper;
  private final UserResponseMapper userResponseMapper;

  @GetMapping("/all")
  public List<UserResponse> getAll() {
    List<User> users = userService.getAll();
    return users.stream().map(userResponseMapper::convertToDto).collect(Collectors.toList());
  }

  @GetMapping("/{userId}")
  public UserResponse getById(@PathVariable Long userId) {
    User user = userService.findById(userId);
    return userResponseMapper.convertToDto(user);
  }

}
