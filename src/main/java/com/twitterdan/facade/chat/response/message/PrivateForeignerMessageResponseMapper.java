package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privateMessage.PrivateForeignerMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

@Service
public class PrivateForeignerMessageResponseMapper extends GeneralFacade<Message, PrivateForeignerMessageResponse> {
  public PrivateForeignerMessageResponseMapper() {
    super(Message.class, PrivateForeignerMessageResponse.class);
  }

  @Override
  protected void decorateDto(PrivateForeignerMessageResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
  }
}
