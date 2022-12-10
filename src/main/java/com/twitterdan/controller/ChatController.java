package com.twitterdan.controller;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.dto.chat.request.PrivateChatRequest;
import com.twitterdan.dto.chat.response.ChatResponseAbstract;
import com.twitterdan.dto.chat.MessageRequest;
import com.twitterdan.dto.chat.response.MessageResponse;
import com.twitterdan.facade.chat.request.PrivateChatRequestMapper;
import com.twitterdan.facade.chat.response.GroupChatResponseMapper;
import com.twitterdan.facade.chat.response.MessageResponseMapper;
import com.twitterdan.facade.chat.response.PrivateChatResponseMapper;
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
  private final PrivateChatResponseMapper privateChatResponseMapper;
  private final GroupChatResponseMapper groupChatResponseMapper;
  private final PrivateChatRequestMapper privateChatRequestMapper;

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

  @GetMapping("/private")
  public ResponseEntity<ChatResponseAbstract> findPrivateChat(@RequestParam Long authUserId, @RequestParam Long guestUserId) {
    Chat chat = chatService.findPrivateChatByUsersIds(authUserId, guestUserId);

    return ResponseEntity.ok(privateChatResponseMapper.convertToDto(chat));
  }

  @PostMapping("/private")
  public ResponseEntity<ChatResponseAbstract> addPrivateChat(@RequestBody PrivateChatRequest privateChatRequest) {
    Chat chat = privateChatRequestMapper.convertToEntity(privateChatRequest);
    Chat savedChat = chatService.savePrivateChat(chat);

    return ResponseEntity.ok(privateChatResponseMapper.convertToDto(savedChat));
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
