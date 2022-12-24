package com.twitterdan.facade.chat.response;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.MessageSeenDto;
import com.twitterdan.dto.chat.response.GroupMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import com.twitterdan.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class GroupMessageResponseMapper extends GeneralFacade<Message, GroupMessageResponse> {
  private final UserService userService;
  public GroupMessageResponseMapper(UserService userService) {
    super(Message.class, GroupMessageResponse.class);
    this.userService = userService;
  }

  @Override
  protected void decorateDto(GroupMessageResponse dto, Message entity, Long authUserId) {
    User authUser = userService.findById(authUserId);
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    List<MessageSeenDto> messagesDto = entity.getSeen().stream()
      .filter(e -> !Objects.equals(e.getUser().getId(), authUser.getId()))
      .map(e -> {
        MessageSeenDto obj = new MessageSeenDto();
        obj.setId(e.getId());
        obj.setSeen(e.getSeen());
        obj.setMessageId(e.getMessage().getId());
        obj.setUserId(e.getUser().getId());
        return obj;
      }).toList();
    dto.setMessagesSeen(messagesDto);
  }
}
