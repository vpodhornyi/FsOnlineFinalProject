package com.twitterdan.controller;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.ChatRequest;
import com.twitterdan.dto.chat.ChatResponseAbstract;
import com.twitterdan.dto.chat.MessageRequest;
import com.twitterdan.dto.chat.MessageResponse;
import com.twitterdan.facade.chat.*;
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
  private final ChatResponseMapper chatResponseMapper;
  private final ChatRequestMapper chatRequestMapper;
  private final PrivateChatResponseMapper privateChatResponseMapper;
  private final GroupChatResponseMapper groupChatResponseMapper;

  @GetMapping
  public ResponseEntity<List<ChatResponseAbstract>> getChats(@RequestParam Long userId) {
    List<ChatResponseAbstract> chats = chatService.findAlLByUserId(userId).stream()
      .map(ch -> {
        if (ch.getType().equals(ChatType.PRIVATE)) {
          return privateChatResponseMapper.convertToDto(ch);
        }
        return groupChatResponseMapper.convertToDto(ch);
      })
      .toList();
    return ResponseEntity.ok(chats);
  }

  @PostMapping
  public ResponseEntity<ChatResponseAbstract> addChat(@RequestBody ChatRequest chatRequest) {
    Chat chat = chatRequestMapper.convertToEntity(chatRequest);
    Chat chat1 = chatService.save(chat);

    return ResponseEntity.ok(chatResponseMapper.convertToDto(chat1));
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
