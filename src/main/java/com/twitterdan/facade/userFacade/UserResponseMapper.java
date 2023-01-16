package com.twitterdan.facade.userFacade;

import com.twitterdan.domain.dto.userDto.UserResponseDto;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.user.User;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class UserResponseMapper extends GeneralFacade<User, UserResponseDto> {

    public UserResponseMapper() {
        super(User.class, UserResponseDto.class);
    }

    @Override
    protected void decorateDto(UserResponseDto dto, User entity) {
        for (Tweet tweet : entity.getTweets()) {
            dto.getTweetsIds().add(tweet.getId());
        }

        for (User user : entity.getFollowers()) {
//            dto.getFollowersIds().add(user.getId());
            dto.getFollowersIds().add(user.getUserTag());
        }

        for (User user : entity.getFollowings()) {
//            dto.getFollowingsIds().add(user.getId());
            dto.getFollowingsIds().add(user.getUserTag());
        }
    }
}
