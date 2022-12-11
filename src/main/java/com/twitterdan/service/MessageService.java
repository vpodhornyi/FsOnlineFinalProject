package com.twitterdan.service;

import com.twitterdan.dao.MessageRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.request.MessageRequest;
import com.twitterdan.facade.chat.MessageRequestMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
  private final MessageRepository messageRepository;
  private final MessageRequestMapper messageRequestMapper;

  public MessageService(MessageRepository messageRepository, MessageRequestMapper messageRequestMapper) {
    this.messageRepository = messageRepository;
    this.messageRequestMapper = messageRequestMapper;
  }

  public List<Message> getAll() {
    return messageRepository.findAll();
  }

  public List<Message> findByChatId(Long id) {
    Optional<List<Message>> optionalMessages = messageRepository.findByChatId(id);
    return optionalMessages.orElseGet(ArrayList::new);
  }

  public Message save(Message message) {
    return messageRepository.save(message);
  }

  public void saveFirstNewChatMessage(Chat chat, User user, String text) {
    Message message = new Message(text, chat, user);
    save(message);
  }
}
