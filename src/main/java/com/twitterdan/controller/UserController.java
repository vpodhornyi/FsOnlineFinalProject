package com.twitterdan.controller;

import com.twitterdan.domain.user.CustomStyle;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.CustomStyleRequest;
import com.twitterdan.dto.user.CustomStyleResponse;
import com.twitterdan.dto.user.UserResponse;
import com.twitterdan.dto.user.UserUpdateDataRequest;
import com.twitterdan.facade.user.CustomStyleRequestMapper;
import com.twitterdan.facade.user.CustomStyleResponseMapper;
import com.twitterdan.facade.user.UserResponseMapper;
import com.twitterdan.service.UserService;
import com.twitterdan.service.auth.JwtAuthService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("${api.version}/users")
public class UserController {

  private final JwtAuthService jwtAuthService;
  private final UserService userService;
  private final UserResponseMapper userResponseMapper;

  private final CustomStyleRequestMapper customStyleRequestMapper;
  private final CustomStyleResponseMapper customStyleResponseMapper;

  @GetMapping("/no-following")
  public List<UserResponse> getNotFollowingUsers(
          @RequestParam String userId,
          @RequestParam int pageNumber,
          @RequestParam int pageSize
  ) {
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    return userService.findAllNotFollowingUsers(Long.parseLong(userId), pageable)
            .stream()
            .map(userResponseMapper::convertToDto)
            .collect(Collectors.toList());
  }

  @GetMapping
  public UserResponse findAuthUser() {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    User user = userService.findByUserTagTrowException(userTag);
    return userResponseMapper.convertToDto(user);
  }

  @GetMapping("/all")
  public List<UserResponse> findAll() {
    return userService.findAll().stream()
            .map(userResponseMapper::convertToDto)
            .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public UserResponse findById(@PathVariable(name = "id") Long id) {
    User user = userService.findById(id);
    return userResponseMapper.convertToDto(user);
  }

  @GetMapping("/search")
  public ResponseEntity<List<UserResponse>> searchUser(@RequestParam String text) {
    List<User> users = userService.findByMatchesInNameOrUserTag(text.trim());

    return ResponseEntity.ok(users.stream().map(userResponseMapper::convertToDto).collect(Collectors.toList()));
  }

  @GetMapping("/")
  public UserResponse findByUserTag(
          @RequestParam(name = "userTag") String userTag
  ) {
    User user = userService.findByUserTagTrowException(userTag);
    return userResponseMapper.convertToDto(user);
  }

  @PutMapping("/{id}")
  public boolean updateUserProfile(
          @Valid
          @PathVariable(name = "id") Long id,
          @RequestBody UserUpdateDataRequest dto
  ) {
    return userService.updateUserProfile(id, dto);
  }

  @PutMapping("/customize")
  public ResponseEntity<CustomStyleResponse> updateUserProfile(@Valid @RequestBody CustomStyleRequest dto) {
    CustomStyle customStyle = userService.updateCustomStyle(dto.getUserId(), customStyleRequestMapper.convertToEntity(dto));
    return ResponseEntity.ok(customStyleResponseMapper.convertToDto(customStyle));
  }

  @ExceptionHandler({Exception.class, MethodArgumentNotValidException.class})
  public ResponseEntity<Object> handleException(Exception ex) {
    return new ResponseEntity<>(ex.getCause(), HttpStatus.BAD_REQUEST);
  }
}
