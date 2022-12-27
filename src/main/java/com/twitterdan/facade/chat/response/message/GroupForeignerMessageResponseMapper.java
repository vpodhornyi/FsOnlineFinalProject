package com.twitterdan.facade.chat.response.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.response.message.groupMessage.GroupForeignerMessageResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupForeignerMessageResponseMapper extends GeneralFacade<Message, GroupForeignerMessageResponse> {
  public GroupForeignerMessageResponseMapper() {
    super(Message.class, GroupForeignerMessageResponse.class);
  }

  @Override
  protected void decorateDto(GroupForeignerMessageResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    Optional<List<MessageSeen>> seen = entity.getSeen();

    if (seen.isPresent()) {
      Optional<MessageSeen> optionalMessageSeen = seen.get().stream().filter(e -> e.getUser().equals(user)).findFirst();

      if (optionalMessageSeen.isPresent()) {
        dto.setIsMessageSeen(true);
      }
    }
  }
}
