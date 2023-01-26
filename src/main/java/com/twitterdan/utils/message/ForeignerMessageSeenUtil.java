package com.twitterdan.utils.message;

import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;

import java.util.List;
import java.util.Optional;

public class ForeignerMessageSeenUtil {
  public static boolean isMessageSeen(Message message, User user) {
    Optional<List<MessageSeen>> optionalSeen = message.getSeen();
    Optional<MessageSeen> optionalMessageSeen = Optional.empty();

    if (optionalSeen.isPresent()) {
      optionalMessageSeen = optionalSeen.get().stream()
        .filter(e -> e.getUser().equals(user))
        .findFirst();
    }

    return optionalMessageSeen.isPresent();
  }
}
