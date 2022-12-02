package com.twitterdan.service;

import com.twitterdan.dao.ChatRepository;
import com.twitterdan.domain.chat.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {
  @Autowired
  private ChatRepository chatRepository;

  public List<Chat> getAll() {
    return chatRepository.findAll();
  }

  public List<Chat> findAlLByUserId(Long id) {
    Optional<List<Chat>> optionalChats = chatRepository.findByUsersId(id);

    return optionalChats.orElseGet(ArrayList::new);
  }
}
