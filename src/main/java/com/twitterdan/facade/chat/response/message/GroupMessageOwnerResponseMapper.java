package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.seen.MessageOwnerSeenResponse;
import com.twitterdan.dto.chat.response.message.groupmessage.GroupMessageOwnerResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.response.seen.MessageOwnerSeenResponseMapper;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupMessageOwnerResponseMapper extends GeneralFacade<Message, GroupMessageOwnerResponse> {
  private final MessageOwnerSeenResponseMapper messageOwnerSeenResponseMapper;
  private final MessageService messageService;

  public GroupMessageOwnerResponseMapper(MessageOwnerSeenResponseMapper messageOwnerSeenResponseMapper,
                                         MessageService messageService) {
    super(Message.class, GroupMessageOwnerResponse.class);
    this.messageOwnerSeenResponseMapper = messageOwnerSeenResponseMapper;
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(GroupMessageOwnerResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    Long userId = user.getId();
    dto.setChatId(chatId);
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(entity.getChat().getId(), userId));
    dto.setLastSeenChatMessageId(messageService.findLastSeenChatMessageId(userId, chatId));
    Optional<List<MessageSeen>> seen = entity.getSeen();

    if (seen.isPresent()) {
      List<MessageOwnerSeenResponse> messagesDto = seen.get().stream()
        .filter(e -> !e.getUser().equals(user))
        .map(messageOwnerSeenResponseMapper::convertToDto).toList();
      dto.setMessagesSeen(messagesDto);
    } else {
      dto.setMessagesSeen(new ArrayList<>());
    }
  }
}
