package com.twitterdan.service;

import com.twitterdan.dao.MessageRepository;
import com.twitterdan.dao.MessageSeenRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageDeleted;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.exception.CouldNotFindMessageException;
import com.twitterdan.exception.DeleteMessageException;
import com.twitterdan.exception.MessageAlreadySeen;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
  private final MessageRepository messageRepository;
  private final MessageSeenRepository messageSeenRepository;

  public MessageService(MessageRepository messageRepository, MessageSeenRepository messageSeenRepository) {
    this.messageRepository = messageRepository;
    this.messageSeenRepository = messageSeenRepository;
  }

  public List<Message> getAll() {
    return messageRepository.findAll();
  }

  public List<Message> findByChatId(Long chatId, Long userId) {
    Optional<List<Message>> optionalMessages = messageRepository.findByChatId(chatId, userId);
    return optionalMessages.orElseGet(ArrayList::new);
  }

  public Message findById(Long id) {
    Optional<Message> optionalMessage = messageRepository.findById(id);

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
    Optional<Integer> countUnreadMessages = messageRepository.getCountAllUnreadMessages(userId);
    return countUnreadMessages.orElse(0);
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
    message.addDeleted(new MessageDeleted(message, user));
    return messageRepository.save(message);
  }

  public void deleteMessageForAll(Long messageId, User user) {
    Optional<Message> optionalMessage = messageRepository.findById(messageId);

    if (optionalMessage.isEmpty()) {
      throw new CouldNotFindMessageException();
    }

    Message message = optionalMessage.get();
    User messageOwner = message.getUser();

    if (!user.equals(messageOwner)) {
      throw new DeleteMessageException();
    }
    messageRepository.deleteById(messageId);
  }
}
