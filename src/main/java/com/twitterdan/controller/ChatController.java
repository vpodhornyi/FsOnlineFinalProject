package com.twitterdan.controller;

import com.twitterdan.domain.Notification;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.MessageRequest;
import com.twitterdan.dto.chat.MessageResponse;
import com.twitterdan.facade.chat.MessageResponseMapper;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/chats")
public class ChatController {

  private final ChatService chatService;
  private final MessageService messageService;
  private final MessageResponseMapper messageResponseMapper;
  private final SimpMessagingTemplate template;

  @GetMapping
  public ResponseEntity<List<Chat>> getChats(@RequestParam Long userId) {

    return ResponseEntity.ok(chatService.findAlLByUserId(userId));
  }

  @PostMapping
  public ResponseEntity<Chat> addChat(@RequestParam Long userId) {

    return ResponseEntity.ok(new Chat());
  }

  @GetMapping("/messages")
  public ResponseEntity<List<Message>> getMessages(@RequestParam Long chatId) {
  List<Message> msgs = messageService.findByChatId(chatId);
    String destination = "/queue/SimpMessagingTemplate";
    String text = "received" + msgs.size() + "messages!";
  Notification notification = new Notification(destination, text);
    template.convertAndSend("/queue/messageSent", notification);
    return ResponseEntity.ok(msgs);
  }

  @PostMapping("/messages")
  public ResponseEntity<MessageResponse> saveMessage(@RequestBody MessageRequest messageRequest) {
    Message message = messageService.save(messageRequest);
    return ResponseEntity.ok(messageResponseMapper.convertToDto(message));
  }
}
