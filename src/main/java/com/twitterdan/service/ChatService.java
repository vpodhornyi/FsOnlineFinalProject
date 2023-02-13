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
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ChatService {
  private final ChatRepository chatRepository;
  private final MessageRepository messageRepository;
  private final ChatDeletedRepository chatDeletedRepository;

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

  public Page<Chat> findAlLByUserId(Long userId, int pageNumber, int pageSize) {
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    Optional<Page<Chat>> optionalChats = chatRepository.findByUsersIdPageable(userId, pageable);

    return optionalChats.orElse(Page.empty());
  }

  public Chat findPrivateChatByUsersIds(Long authUserId, Long guestUserId) {
    Optional<Chat> optionalChat =
            chatRepository.findPrivateChatByUsersIds(ChatType.PRIVATE.toString(), authUserId, guestUserId);

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

  public Chat editGroupChat(Long chatId, String title, String imgUrl, User user) {
    Optional<Chat> optionalChat = chatRepository.findById(chatId);

    if (optionalChat.isPresent()) {
      Chat chat = optionalChat.get();

      if (chat.getType().equals(ChatType.GROUP)) {
        chat.setTitle(title);
        chat.setAvatarImgUrl(imgUrl);
        chat.setUpdatedBy(user.getEmail());
        chat.setUpdatedAt(LocalDateTime.now());

        return saveChat(chat);
      }
    }
    throw new CouldNotFindChatException();
  }

  public Chat deleteUserFromGroupChat(Long chatId, User user) {
    Chat chat = this.findById(chatId);

    List<User> users = chat.getUsers()
            .stream()
            .filter(u -> ! u.equals(user))
            .collect(Collectors.toCollection(ArrayList::new));
    chat.setUsers(users);

    return chatRepository.save(chat);
  }

  @Transactional
  public Chat addUsersToChat(Long chatId, List<User> users) {
    Optional<Chat> optionalChat = chatRepository.findById(chatId);
    Optional<Message> optionalMessage = messageRepository.findFirstByChatIdOrderByCreatedAtDesc(chatId);

    if (optionalMessage.isPresent()) {
      Message lastChatMessage = optionalMessage.get();
      users.forEach(lastChatMessage::addSeen);
      messageRepository.save(lastChatMessage);
    }

    if (optionalChat.isPresent()) {
      Chat chat = optionalChat.get();
      chat.addUsers(users);
      return chatRepository.save(chat);
    }

    throw new CouldNotFindChatException(false);
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
}
