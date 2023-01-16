package com.twitterdan.controller;

import com.twitterdan.domain.dto.userDto.UserResponseDto;
import com.twitterdan.domain.user.User;
import com.twitterdan.facade.userFacade.UserResponseMapper;
import com.twitterdan.service.FollowerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class FollowerController {
    private final FollowerService followerService;
    private final UserResponseMapper userResponseMapper;

    @PutMapping("/follow")
    public boolean followUser(
            @RequestParam(name = "userId") String userId,
            @RequestParam(name = "userToFollowId") String userToFollowId
    ) {
        return followerService.followUser(Long.parseLong(userId), Long.parseLong(userToFollowId));
    }

    @PutMapping("/unfollow")
    public boolean unfollowUser(
            @RequestParam(name = "userId") String userId,
            @RequestParam(name = "userToUnfollowId") String userToUnfollowId
    ) {
        return followerService.unfollowUser(Long.parseLong(userId), Long.parseLong(userToUnfollowId));
    }

}
