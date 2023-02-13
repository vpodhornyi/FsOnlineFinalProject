package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privatemessage.PrivateForeignerMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

@Service
public class PagePrivateForeignerMessageResponseMapper extends GeneralFacade<Message, PrivateForeignerMessageResponse> {

  public PagePrivateForeignerMessageResponseMapper() {
    super(Message.class, PrivateForeignerMessageResponse.class);
  }

  @Override
  protected void decorateDto(PrivateForeignerMessageResponse dto, Message entity, User user) {
    dto.setChatId(entity.getChat().getId());
    dto.setMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
  }
}
