package com.twitterdan.service;

import com.twitterdan.dao.MessageRepository;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.MessageRequest;
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

  public Message save(MessageRequest messageRequestRequest) {
    Message message = messageRequestMapper.convertToEntity(messageRequestRequest);
    return messageRepository.save(message);
  }
}
