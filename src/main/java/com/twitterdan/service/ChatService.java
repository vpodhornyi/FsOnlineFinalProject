package com.twitterdan.service;

import com.twitterdan.dao.ChatDeletedRepository;
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
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChatService {
  private final ChatRepository chatRepository;
  private final MessageRepository messageRepository;
  private final ChatDeletedRepository chatDeletedRepository;

  public ChatService(ChatRepository chatRepository, MessageRepository messageRepository, ChatDeletedRepository chatDeletedRepository) {
    this.chatRepository = chatRepository;
    this.messageRepository = messageRepository;
    this.chatDeletedRepository = chatDeletedRepository;
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

    return optionalChats.map(Slice::getContent).orElseGet(ArrayList::new);
  }

  public Chat findPrivateChatByUsersIds(Long authUserId, Long guestUserId) {
    Optional<Chat> optionalChat = chatRepository.findPrivateChatByUsersIds(ChatType.PRIVATE.toString(), authUserId, guestUserId);

    if (optionalChat.isPresent()) {
      return optionalChat.get();
    }

    throw new CouldNotFindChatException(false);
  }

  public boolean isPrivateChatExist(List<User> users) {
    Long idOne = users.get(0).getId();
    Long idTwo = users.get(1).getId();
    Optional<Chat> optionalChat = chatRepository.findPrivateChatByUsersIds(ChatType.PRIVATE.toString(), idOne, idTwo);

    return optionalChat.isPresent();
  }

  public Chat savePrivateChat(Chat chat) {
    if (isPrivateChatExist(chat.getUsers())) {
      throw new ChatAlreadyExistException();
    }

    return chatRepository.save(chat);
  }

  public Chat saveChat(Chat chat) {
    return chatRepository.save(chat);
  }

  public Chat deleteUserFromGroupChat(Long chatId, User user) {
    Chat chat = this.findById(chatId);

    List<User> users = chat.getUsers()
      .stream()
      .filter(u -> !u.equals(user))
      .collect(Collectors.toCollection(ArrayList::new));
    chat.setUsers(users);

    return chatRepository.save(chat);
  }

  public Chat deleteUserFromPrivateChat(Long chatId, User user) {
    Optional<List<Message>> optionalMessages = messageRepository.findByChatId(chatId, user.getId());

    if (optionalMessages.isPresent()) {
      List<Message> messages = optionalMessages.get();
      messages.forEach(m -> {
        m.addDeleted(user);
        messageRepository.save(m);
      });
    }

    Chat chat = this.findById(chatId);
    chat.addDeleted(user);
    return chatRepository.save(chat);
  }

  @Transactional
  public void resetDeletedChat(Long userId, Long chatId) {
    chatDeletedRepository.deleteByUserIdAndChatId(userId, chatId);
  }

//  public List<Chat> test (Long id) {
//    return findAlLByUserId(id);
//  }
}
