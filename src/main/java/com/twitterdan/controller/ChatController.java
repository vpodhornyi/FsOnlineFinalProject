package com.twitterdan.controller;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/chats")
public class ChatController {

  private final ChatService chatService;
  private final MessageService messageService;

  @GetMapping
  public ResponseEntity<List<Chat>> getChats(@RequestParam Long userId) {

    return ResponseEntity.ok(chatService.findAlLByUserId(userId));
  }

  @GetMapping("/messages")
  public ResponseEntity<List<Message>> getMessages(@RequestParam Long chatId) {

    return ResponseEntity.ok(messageService.findByChatId(chatId));
  }
}
