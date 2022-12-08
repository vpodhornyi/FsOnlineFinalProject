package com.twitterdan.controller;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.ChatRequest;
import com.twitterdan.dto.chat.ChatResponse;
import com.twitterdan.dto.chat.MessageRequest;
import com.twitterdan.dto.chat.MessageResponse;
import com.twitterdan.facade.chat.ChatRequestMapper;
import com.twitterdan.facade.chat.ChatResponseMapper;
import com.twitterdan.facade.chat.MessageRequestMapper;
import com.twitterdan.facade.chat.MessageResponseMapper;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/chats")
public class ChatController {

  private final ChatService chatService;
  private final MessageService messageService;
  private final MessageResponseMapper messageResponseMapper;
  private final MessageRequestMapper messageRequestMapper;
  private final ChatResponseMapper chatResponseMapper;
  private final ChatRequestMapper chatRequestMapper;

  @GetMapping
  public ResponseEntity<List<ChatResponse>> getChats(@RequestParam Long userId) {
    List<ChatResponse> chats = chatService.findAlLByUserId(userId).stream()
      .map(chatResponseMapper::convertToDto)
      .toList();
    return ResponseEntity.ok(chats);
  }

  @PostMapping
  public ResponseEntity<ChatResponse> addChat(@RequestBody ChatRequest chatRequest) {
    Chat chat = chatRequestMapper.convertToEntity(chatRequest);
    System.out.println(chat);
    return ResponseEntity.ok(null);
  }

  @GetMapping("/messages")
  public ResponseEntity<List<Message>> getMessages(@RequestParam Long chatId) {

    return ResponseEntity.ok(messageService.findByChatId(chatId));
  }

  @PostMapping("/messages")
  public ResponseEntity<MessageResponse> saveMessage(@RequestBody MessageRequest messageRequest) {
    Message message = messageService.save(messageRequest);
    return ResponseEntity.ok(messageResponseMapper.convertToDto(message));
  }
}
