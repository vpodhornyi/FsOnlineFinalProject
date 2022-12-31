package com.twitterdan.facade.chat.response.seen;

import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.seen.ForeignerMessageSeenResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.ChatUserMapper;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class ForeignerMessageSeenResponseMapper extends GeneralFacade<MessageSeen, ForeignerMessageSeenResponse> {
  private final ChatUserMapper chatUserMapper;
  private final MessageService messageService;

  public ForeignerMessageSeenResponseMapper(ChatUserMapper chatUserMapper, MessageService messageService) {
    super(MessageSeen.class, ForeignerMessageSeenResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(ForeignerMessageSeenResponse dto, MessageSeen entity) {
    User user = entity.getUser();
    Long userId = user.getId();
    Long chatId = entity.getMessage().getChat().getId();
    dto.setMessageId(entity.getMessage().getId());
    dto.setChatId(chatId);
    dto.setUser(chatUserMapper.convertToDto(user));
    dto.setCountUnreadSelectedChatMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(userId));
  }
}
