package com.twitterdan.service;

import com.twitterdan.dao.ChatRepository;
import com.twitterdan.dao.MessageRepository;
import com.twitterdan.dao.MessageSeenRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.exception.CouldNotFindMessageException;
import com.twitterdan.exception.DeleteMessageException;
import com.twitterdan.exception.MessageAlreadySeen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
  private final ChatRepository chatRepository;
  private final MessageRepository messageRepository;
  private final MessageSeenRepository messageSeenRepository;

  public MessageService(ChatRepository chatRepository, MessageRepository messageRepository,
                        MessageSeenRepository messageSeenRepository) {
    this.chatRepository = chatRepository;
    this.messageRepository = messageRepository;
    this.messageSeenRepository = messageSeenRepository;
  }

  public List<Message> getAll() {
    return messageRepository.findAll();
  }

  public Page<Message> findByChatId(Long chatId, Long userId, int pageNumber, int pageSize) {
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    Optional<Page<Message>> optionalMessages = messageRepository.findPageByChatId(chatId, userId, pageable);

    return optionalMessages.orElse(Page.empty());
  }

  public Message findById(Long id) {
    Optional<Message> optionalMessage = messageRepository.findById(id);

    if (optionalMessage.isPresent()) {
      return optionalMessage.get();
    }

    throw new CouldNotFindMessageException(false);
  }

  public Message findLastChatMessage(Long chatId, Long userId) {
    Optional<Message> optionalMessage = messageRepository.findLastChatMessageForUser(chatId, userId);

    if (optionalMessage.isPresent()) {
      return optionalMessage.get();
    }

    throw new CouldNotFindMessageException(false);
  }

  public Integer getCountUnreadChatMessagesByUserId(Long chatId, Long userId) {
    Optional<Integer> countUnreadMessages = messageRepository.getCountUnreadMessages(chatId, userId);
    return countUnreadMessages.orElse(0);
  }

  public Integer getCountAllUnreadChatMessagesByUserId(Long userId) {
    Optional<List<Chat>> optionalChats = chatRepository.findByUsersId(userId);
    return optionalChats.map(chats -> chats.stream()
            .map(ch -> messageRepository.getCountUnreadMessages(ch.getId(), userId).orElse(0))
            .reduce(0, Integer::sum)).orElse(0);
  }

  @Transactional
  public Message save(Message message) {
    return messageRepository.save(message);
  }

  public MessageSeen saveMessageSeen(MessageSeen messageSeen) {
    Optional<MessageSeen> optionalMessageSeen = messageSeenRepository
            .findByUserIdAndMessageId(messageSeen.getUser().getId(), messageSeen.getMessage().getId());

    if (optionalMessageSeen.isEmpty()) {
      return messageSeenRepository.save(messageSeen);
    }

    throw new MessageAlreadySeen(false);
  }

  public Message deleteMessageForAuthUser(Message message, User user) {
    message.addDeleted(user);
    return messageRepository.save(message);
  }

  public void deleteMessageForAll(Long messageId, User user) {
    Optional<Message> optionalMessage = messageRepository.findById(messageId);

    if (optionalMessage.isEmpty()) {
      throw new CouldNotFindMessageException();
    }

    Message message = optionalMessage.get();
    User messageOwner = message.getUser();

    if (! user.equals(messageOwner)) {
      throw new DeleteMessageException();
    }
    messageRepository.deleteById(messageId);
  }

  public Long findLastSeenChatMessageId(Long userId, Long chatId) {
    Optional<Message> optionalMessage = messageRepository.findLastSeenChatMessage(userId, chatId);

    if (optionalMessage.isPresent()) {
      return optionalMessage.get().getId();
    }

    return 0L;
  }
}
