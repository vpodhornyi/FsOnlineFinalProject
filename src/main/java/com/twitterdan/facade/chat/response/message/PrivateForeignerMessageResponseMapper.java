package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.privatemessage.PrivateForeignerMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.response.chat.PrivateChatResponseMapper;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import com.twitterdan.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;


@Service
public class PrivateForeignerMessageResponseMapper extends GeneralFacade<Message, PrivateForeignerMessageResponse> {
  private final MessageService messageService;
  private final ChatService chatService;
  private final PrivateChatResponseMapper privateChatResponseMapper;

  public PrivateForeignerMessageResponseMapper(MessageService messageService, ChatService chatService,
                                               PrivateChatResponseMapper privateChatResponseMapper) {
    super(Message.class, PrivateForeignerMessageResponse.class);
    this.messageService = messageService;
    this.chatService = chatService;
    this.privateChatResponseMapper = privateChatResponseMapper;
  }

  @Override
  protected void decorateDto(PrivateForeignerMessageResponse dto, Message entity, User user) {
    Long userId = user.getId();
    Chat chat = entity.getChat();
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);

    if (chat.getDeleted().size() > 0) {
      dto.setChat(privateChatResponseMapper.convertToDto(chat, user));
      chatService.resetDeletedChat(userId, chatId);
    } else {
      dto.setChat(null);
    }

    Long lastSeenChatMessageId = messageService.findLastSeenChatMessageId(userId, chatId);

    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(userId));
    dto.setLastSeenChatMessageId(lastSeenChatMessageId);
  }
}
