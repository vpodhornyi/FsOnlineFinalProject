package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.LastChatMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.MessageService;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

@Service
public class LastChatMessageMapper extends GeneralFacade<Message, LastChatMessageResponse> {
  private final MessageService messageService;

  public LastChatMessageMapper(MessageService messageService) {
    super(Message.class, LastChatMessageResponse.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(LastChatMessageResponse dto, Message entity, User user) {
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(userId));
    dto.setMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
    dto.setChatId(chatId);
    dto.setMessageOwner(user.equals(entity.getUser()));
    dto.setLastSeenChatMessageId(messageService.findLastSeenChatMessageId(userId, chatId));
  }
}
