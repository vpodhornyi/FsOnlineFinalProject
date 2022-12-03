package com.twitterdan.service;

import com.twitterdan.dao.ChatRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.exception.CouldNotFindChatException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
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
}
