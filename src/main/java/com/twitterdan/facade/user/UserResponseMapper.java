package com.twitterdan.facade.user;

import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.user.UserResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class UserResponseMapper extends GeneralFacade<User, UserResponse> {
  private final MessageService messageService;

  public UserResponseMapper(MessageService messageService) {
    super(User.class, UserResponse.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateEntity(User entity, UserResponse dto) {

  }
  @Override
  protected void decorateDto(UserResponse dto, User entity) {
    dto.setCountUnreadMessages(messageService.getCountAllUnreadChatMessagesByUserId(entity.getId()));

    for (Tweet tweet : entity.getTweets()) {
      dto.getTweetsIds().add(tweet.getId());
    }

    for (User user : entity.getFollowers()) {
      dto.getFollowersTags().add(user.getUserTag());
    }

    for (User user : entity.getFollowings()) {
      dto.getFollowingsTags().add(user.getUserTag());
    }
  }
}
