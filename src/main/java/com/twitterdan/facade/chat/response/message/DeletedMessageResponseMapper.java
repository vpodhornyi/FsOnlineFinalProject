package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.DeletedMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class DeletedMessageResponseMapper extends GeneralFacade<Message, DeletedMessageResponse> {
  private final MessageService messageService;
  private final LastChatMessageMapper lastChatMessageMapper;

  public DeletedMessageResponseMapper(MessageService messageService, LastChatMessageMapper lastChatMessageMapper) {
    super(Message.class, DeletedMessageResponse.class);
    this.messageService = messageService;
    this.lastChatMessageMapper = lastChatMessageMapper;
  }

  @Override
  protected void decorateDto(DeletedMessageResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setMessageId(entity.getId());

    try {
      Message lastChatMessage = messageService.findLastChatMessage(chatId, user.getId());
      dto.setLastMessage(lastChatMessageMapper.convertToDto(lastChatMessage, user));

    } catch (Exception e) {
      dto.setLastMessage(null);
    }
  }
}
