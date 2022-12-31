package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.LastChatMessage;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.MessageService;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

@Service
public class LastChatMessageMapper extends GeneralFacade<Message, LastChatMessage> {
  private final MessageService messageService;

  public LastChatMessageMapper(MessageService messageService) {
    super(Message.class, LastChatMessage.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(LastChatMessage dto, Message entity, User user) {
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(userId));
    dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
    dto.setChatId(chatId);
    dto.setIsMessageOwner(user.equals(entity.getUser()));
  }
}
