package com.twitterdan.controller;

import com.twitterdan.domain.dto.userDto.UserResponseDto;
import com.twitterdan.domain.dto.userDto.UserProfileUpdateRequestDto;
import com.twitterdan.domain.user.User;
import com.twitterdan.facade.userFacade.UserResponseMapper;
import com.twitterdan.service.UserService;
import lombok.AllArgsConstructor;
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
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserResponseMapper userResponseMapper;

    @GetMapping
    public List<UserResponseDto> findAll() {
        return userService.findAll().stream()
                .map(userResponseMapper::convertToDto)
                .collect(Collectors.toList());
    }

//    @GetMapping("/{id}")
//    public UserResponseDto findById(
//            @PathVariable(name = "id") Long id
//    ) {
//        User user = userService.findById(id);
//        return userResponseMapper.convertToDto(user);
//    }

    @GetMapping("/{userTag}")
    public UserResponseDto findByUserTag (
            @PathVariable(name = "userTag") String userTag
    ) {
        User user = userService.findByUserTag(userTag);
        return userResponseMapper.convertToDto(user);
    }

    @PutMapping("/{id}")
    public boolean updateUserProfile(
            @Valid
            @PathVariable(name = "id") Long id,
            @RequestBody UserProfileUpdateRequestDto dto
    ) {
       return userService.updateUserProfile(id, dto);
    }

    @ExceptionHandler({Exception.class, MethodArgumentNotValidException.class})
    public ResponseEntity<Object> handleException(Exception ex) {
        return new ResponseEntity<>(ex.getCause(), HttpStatus.BAD_REQUEST);
    }
}
