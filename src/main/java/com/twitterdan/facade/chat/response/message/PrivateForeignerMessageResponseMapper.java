package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privateMessage.PrivateForeignerMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

@Service
public class PrivateForeignerMessageResponseMapper extends GeneralFacade<Message, PrivateForeignerMessageResponse> {
  private final MessageService messageService;
  public PrivateForeignerMessageResponseMapper(MessageService messageService) {
    super(Message.class, PrivateForeignerMessageResponse.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(PrivateForeignerMessageResponse dto, Message entity, User user) {
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(userId));
  }
}
