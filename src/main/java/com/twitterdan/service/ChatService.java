package com.twitterdan.service;

import com.twitterdan.dao.ChatRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.user.User;
import com.twitterdan.exception.CouldNotFindAccountException;
import com.twitterdan.exception.CouldNotFindChatException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class ChatService {
  private final ChatRepository chatRepository;

  public ChatService(ChatRepository chatRepository) {
    this.chatRepository = chatRepository;
  }

  public List<Chat> getAll() {
    return chatRepository.findAll();
  }

  public Chat findById(Long id) {
    Optional<Chat> optionalChat = chatRepository.findById(id);

    if (optionalChat.isPresent()) {
      return optionalChat.get();
    }
    throw new CouldNotFindChatException();
  }

  public List<Chat> findAlLByUserId(Long id) {
    Optional<List<Chat>> optionalChats = chatRepository.findByUsersId(id);
    return optionalChats.orElseGet(ArrayList::new);
  }

  public Chat findPrivateChatByUsersIds(Long authUserId, Long guestUserId) {
    Optional<Chat> optionalChat = chatRepository.findPrivateChatByUsersIds(ChatType.PRIVATE, authUserId, guestUserId);

    if (optionalChat.isPresent()) {
      return optionalChat.get();
    }

    throw new CouldNotFindAccountException(false);
  }

  public Chat save(Chat chat) {
    return chatRepository.save(chat);
  }
}
