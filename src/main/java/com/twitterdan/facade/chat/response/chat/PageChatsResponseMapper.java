package com.twitterdan.facade.chat.response.chat;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.chat.PageChatResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageChatsResponseMapper {
  private final PrivateChatResponseMapper privateChatResponseMapper;
  private final GroupChatResponseMapper groupChatResponseMapper;

  public PageChatsResponseMapper(PrivateChatResponseMapper privateChatResponseMapper,
                                 GroupChatResponseMapper groupChatResponseMapper) {
    this.privateChatResponseMapper = privateChatResponseMapper;
    this.groupChatResponseMapper = groupChatResponseMapper;
  }

  public PageChatResponse convertToDto(Page<Chat> entity, User user) {
    PageChatResponse dto = new PageChatResponse();
    dto.setTotalPages(entity.getTotalPages());
    dto.setTotalElements(entity.getTotalElements());

    List<Chat> chats = entity.getContent();

    if (chats.size() > 0) {
      dto.setChats(chats.stream().map(ch -> {
        if (ch.getType().equals(ChatType.PRIVATE)) {
          return privateChatResponseMapper.convertToDto(ch, user);
        }
        return groupChatResponseMapper.convertToDto(ch, user);
      }).toList());
    }
    return dto;
  }
}
