package com.twitterdan.facade.chat;

import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class ChatUserMapper extends GeneralFacade<User, ChatUser> {
  public ChatUserMapper() {
    super(User.class, ChatUser.class);
  }
}
