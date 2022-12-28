package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.LastChatMessage;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LastChatMessageMapper extends GeneralFacade<Message, LastChatMessage> {
  public LastChatMessageMapper() {
    super(Message.class, LastChatMessage.class);
  }

  @Override
  protected void decorateDto(LastChatMessage dto, Message entity, User user) {
    dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
    dto.setChatId(entity.getChat().getId());
    dto.setIsMessageOwner(user.equals(entity.getUser()));
  }
}
