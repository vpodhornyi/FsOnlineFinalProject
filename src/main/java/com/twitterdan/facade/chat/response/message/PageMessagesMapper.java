package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.PageMessagesResponse;
import com.twitterdan.service.MessageService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class PageMessagesMapper {
  private final PagePrivateMessageOwnerResponseMapper privateMessageOwnerResponseMapper;
  private final PagePrivateForeignerMessageResponseMapper privateForeignerMessageResponseMapper;
  private final PageGroupMessageOwnerResponseMapper groupMessageOwnerResponseMapper;
  private final PageGroupForeignerMessageResponseMapper groupForeignerMessageResponseMapper;
  private final MessageService messageService;

  public PageMessagesMapper(PagePrivateMessageOwnerResponseMapper privateMessageOwnerResponseMapper,
                            PagePrivateForeignerMessageResponseMapper privateForeignerMessageResponseMapper,
                            PageGroupMessageOwnerResponseMapper groupMessageOwnerResponseMapper,
                            PageGroupForeignerMessageResponseMapper groupForeignerMessageResponseMapper,
                            MessageService messageService) {
    this.privateMessageOwnerResponseMapper = privateMessageOwnerResponseMapper;
    this.privateForeignerMessageResponseMapper = privateForeignerMessageResponseMapper;
    this.groupMessageOwnerResponseMapper = groupMessageOwnerResponseMapper;
    this.groupForeignerMessageResponseMapper = groupForeignerMessageResponseMapper;
    this.messageService = messageService;
  }

  public PageMessagesResponse convertToDto(Page<Message> entity, User user) {
    PageMessagesResponse dto = new PageMessagesResponse();
    dto.setTotalPages(entity.getTotalPages());
    dto.setTotalElements(entity.getTotalElements());

    List<Message> messages = entity.getContent();

    if (messages.size() > 0) {
      Message message = messages.get(0);
      ChatType type = message.getChat().getType();
      Chat chat = message.getChat();
      dto.setChatId(chat.getId());
      dto.setLastSeenChatMessageId(messageService.findLastSeenChatMessageId(user.getId(), chat.getId()));

      if (type.equals(ChatType.PRIVATE)) {
        messages.forEach(m -> {
          if (user.equals(m.getUser())) {
            dto.addMessage(privateMessageOwnerResponseMapper.convertToDto(m, user));
          } else {
            dto.addMessage(privateForeignerMessageResponseMapper.convertToDto(m, user));
          }
        });
      }

      if (type.equals(ChatType.GROUP)) {
        messages.forEach(m -> {
          if (user.equals(m.getUser())) {
            dto.addMessage(groupMessageOwnerResponseMapper.convertToDto(m, user));
          } else {
            dto.addMessage(groupForeignerMessageResponseMapper.convertToDto(m, user));
          }
        });
      }

      Collections.reverse(dto.getMessages());
    }
    return dto;
  }
}
