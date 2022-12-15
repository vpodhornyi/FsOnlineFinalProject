package com.twitterdan.service;

import com.twitterdan.dao.ChatRepository;
import com.twitterdan.dao.MessageRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.exception.ChatAlreadyExistException;
import com.twitterdan.exception.CouldNotFindChatException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class ChatService {
  private final ChatRepository chatRepository;
  private final MessageRepository messageRepository;

  public ChatService(ChatRepository chatRepository, MessageRepository messageRepository) {
    this.chatRepository = chatRepository;
    this.messageRepository = messageRepository;
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

  public List<Chat> findAlLByUserId(Long userId, int pageNumber, int pageSize) {
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    Optional<Page<Chat>> optionalChats = chatRepository.findByUsersId(userId, pageable);
    return optionalChats.map(chats -> chats.stream()
      .peek(chat -> {
        Optional<Message> optionalMessage = messageRepository.findFirstByChatIdOrderByCreatedAtDesc(chat.getId());
        if (optionalMessage.isPresent()) {
          Message message = optionalMessage.get();
          chat.setLastMessage(message);
        }
      }).toList()).orElseGet(() -> (List<Chat>) optionalChats.orElseGet(Page::empty));
  }

  public Chat findPrivateChatByUsersIds(Long authUserId, Long guestUserId) {
    Optional<List<Chat>> optionalChat = chatRepository.findPrivateChatByUsersIds(ChatType.PRIVATE, authUserId, guestUserId);

    if (optionalChat.isPresent()) {
      System.out.println(optionalChat.get());
      return null;
    }

    throw new CouldNotFindChatException(false);
  }

  public boolean isPrivateChatExist(List<User> users) {
    Long idOne = users.get(0).getId();
    Long idTwo = users.get(1).getId();
    Optional<List<Chat>> optionalChat = chatRepository.findPrivateChatByUsersIds(ChatType.PRIVATE, idOne, idTwo);

    return optionalChat.isPresent();
  }

  public Chat savePrivateChat(Chat chat) {
    if (isPrivateChatExist(chat.getUsers())) {
      throw new ChatAlreadyExistException();
    }

    return chatRepository.save(chat);
  }

  public Chat saveGroupChat(Chat chat) {
    return chatRepository.save(chat);
  }

//  public List<Chat> test (Long id) {
//    return findAlLByUserId(id);
//  }
}
