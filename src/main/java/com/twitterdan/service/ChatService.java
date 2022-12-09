package com.twitterdan.service;

import com.twitterdan.dao.ChatRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.dto.chat.ChatRequest;
import com.twitterdan.exception.CouldNotFindChatException;
import com.twitterdan.facade.chat.ChatRequestMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ChatService {
  private final ChatRepository chatRepository;

  private final ChatRequestMapper chatRequestMapper;

  public ChatService(ChatRepository chatRepository, ChatRequestMapper chatRequestMapper) {
    this.chatRepository = chatRepository;
    this.chatRequestMapper = chatRequestMapper;
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

  public Chat save(ChatRequest chatRequest) {
    Chat chat = chatRequestMapper.convertToEntity(chatRequest);
    return chatRepository.save(chat);
  }
}
