package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.groupmessage.GroupForeignerMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.facade.chat.response.chat.GroupChatResponseMapper;
import com.twitterdan.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupForeignerMessageResponseMapper extends GeneralFacade<Message, GroupForeignerMessageResponse> {
  private final MessageService messageService;
  private final GroupChatResponseMapper groupChatResponseMapper;

  public GroupForeignerMessageResponseMapper(MessageService messageService,
                                             GroupChatResponseMapper groupChatResponseMapper) {
    super(Message.class, GroupForeignerMessageResponse.class);
    this.messageService = messageService;
    this.groupChatResponseMapper = groupChatResponseMapper;
  }

  @Override
  protected void decorateDto(GroupForeignerMessageResponse dto, Message entity, User user) {
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setChat(groupChatResponseMapper.convertToDto(entity.getChat()));
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    int foo = messageService.getCountAllUnreadChatMessagesByUserId(userId);
    System.out.println(foo);
    dto.setCountUnreadAllChatMessages(foo);
    Optional<List<MessageSeen>> seen = entity.getSeen();

    Long lastSeenChatMessageId = messageService.findLastSeenChatMessageId(userId, chatId);
    dto.setLastSeenChatMessageId(lastSeenChatMessageId);


    if (seen.isPresent()) {
      Optional<MessageSeen> optionalMessageSeen = seen.get().stream()
        .filter(e -> e.getUser().equals(user)).findFirst();

      if (optionalMessageSeen.isPresent()) {
        dto.setMessageSeen(true);
      }
    }
  }
}
