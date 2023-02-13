package com.twitterdan.controller;

import com.twitterdan.service.FollowerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("${api.version}/subscribing")
public class FollowerController {
  private final FollowerService followerService;

  @PutMapping("/follow")
  public boolean followUser(@RequestParam(name = "userId") String userId,
                            @RequestParam(name = "userToFollowId") String userToFollowId) {
    return followerService.followUser(Long.parseLong(userId), Long.parseLong(userToFollowId));
  }

  @PutMapping("/unfollow")
  public boolean unfollowUser(@RequestParam(name = "userId") String userId,
                              @RequestParam(name = "userToUnfollowId") String userToUnfollowId) {
    return followerService.unfollowUser(Long.parseLong(userId), Long.parseLong(userToUnfollowId));
  }

}
