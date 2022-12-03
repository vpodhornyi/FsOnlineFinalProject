package com.twitterdan.controller;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.MessageRequest;
import com.twitterdan.dto.chat.MessageResponse;
import com.twitterdan.facade.chat.MessageResponseMapper;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/chats")
public class ChatController {

  private final ChatService chatService;
  private final MessageService messageService;
  private final MessageResponseMapper messageResponseMapper;

  @GetMapping
  public ResponseEntity<List<Chat>> getChats(@RequestParam Long userId) {

    return ResponseEntity.ok(chatService.findAlLByUserId(userId));
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
