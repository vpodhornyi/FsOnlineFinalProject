package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privatemessage.PrivateMessageOwnerResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagePrivateMessageOwnerResponseMapper extends GeneralFacade<Message, PrivateMessageOwnerResponse> {
  public PagePrivateMessageOwnerResponseMapper() {
    super(Message.class, PrivateMessageOwnerResponse.class);
  }

  @Override
  protected void decorateDto(PrivateMessageOwnerResponse dto, Message entity, User user) {
    List<User> users = entity.getChat().getUsers();
    dto.setChatId(entity.getChat().getId());
    Optional<User> optionalUser = users.stream().filter(u -> !u.equals(user)).findFirst();

    if (optionalUser.isPresent()) {
      dto.setMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, optionalUser.get()));
    } else {
      dto.setMessageSeen(false);
    }
  }
}
