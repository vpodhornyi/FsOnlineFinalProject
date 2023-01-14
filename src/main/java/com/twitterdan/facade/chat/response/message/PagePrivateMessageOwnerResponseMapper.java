package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privateMessage.PrivateMessageOwnerResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

@Service
public class PagePrivateMessageOwnerResponseMapper extends GeneralFacade<Message, PrivateMessageOwnerResponse> {
  public PagePrivateMessageOwnerResponseMapper() {
    super(Message.class, PrivateMessageOwnerResponse.class);
  }

  @Override
  protected void decorateDto(PrivateMessageOwnerResponse dto, Message entity, User user) {
    dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
  }
}
