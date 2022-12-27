package com.twitterdan.controller;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.request.GroupChatRequest;
import com.twitterdan.dto.chat.request.MessageSeenRequest;
import com.twitterdan.dto.chat.request.PrivateChatRequest;
import com.twitterdan.dto.chat.response.ChatResponseAbstract;
import com.twitterdan.dto.chat.request.MessageRequest;
import com.twitterdan.dto.chat.response.MessageResponseAbstract;
import com.twitterdan.facade.chat.request.MessageRequestMapper;
import com.twitterdan.facade.chat.response.MessageSeenResponseMapper;
import com.twitterdan.facade.chat.request.GroupChatRequestMapper;
import com.twitterdan.facade.chat.request.MessageSeenRequestMapper;
import com.twitterdan.facade.chat.request.PrivateChatRequestMapper;
import com.twitterdan.facade.chat.response.*;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import com.twitterdan.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/chats")
public class ChatController {
  private final ChatService chatService;
  private final UserService userService;
  private final MessageService messageService;
  private final MessageRequestMapper messageRequestMapper;
  private final PrivateChatResponseMapper privateChatResponseMapper;
  private final GroupChatResponseMapper groupChatResponseMapper;
  private final PrivateChatRequestMapper privateChatRequestMapper;
  private final GroupChatRequestMapper groupChatRequestMapper;
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final PrivateMessageResponseMapper privateMessageResponseMapper;
  private final GroupMessageResponseMapper groupMessageResponseMapper;
  private final MessageSeenResponseMapper messageSeenResponseMapper;
  private final MessageSeenRequestMapper messageSeenRequestMapper;

  @GetMapping
  public ResponseEntity<List<ChatResponseAbstract>> getChats(
    @RequestParam Long userId,
    @RequestParam int pageNumber,
    @RequestParam int pageSize
  ) {
    User user = userService.findById(userId);
    List<ChatResponseAbstract> chats = chatService.findAlLByUserId(userId, pageNumber, pageSize)
      .stream()
      .map(ch -> {
        if (ch.getType().equals(ChatType.PRIVATE)) {
          return privateChatResponseMapper.convertToDto(ch, user);
        }
        return groupChatResponseMapper.convertToDto(ch);
      })
      .toList();
    return ResponseEntity.ok(chats);
  }

  private void saveFirstChatMessage(Long id, Chat chat, String text) {
    User user = userService.findById(id);
    Message message = messageService.saveFirstNewChatMessage(chat, user, text);
    chat.setLastMessage(message);
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
    Long authUserId = privateChatRequest.getAuthUserId();
    String text = privateChatRequest.getMessage();
    saveFirstChatMessage(authUserId, savedChat, text);

    return ResponseEntity.ok(privateChatResponseMapper.convertToDto(savedChat));
  }

  @PostMapping("/group")
  public ResponseEntity<ChatResponseAbstract> addGroupChat(@RequestBody GroupChatRequest groupChatRequest) {
    Chat chat = groupChatRequestMapper.convertToEntity(groupChatRequest);
    Chat savedChat = chatService.saveGroupChat(chat);
    Long authUserId = groupChatRequest.getAuthUserId();
    String text = groupChatRequest.getMessage();
    saveFirstChatMessage(authUserId, savedChat, text);

    return ResponseEntity.ok(groupChatResponseMapper.convertToDto(savedChat));
  }

  @GetMapping("/messages")
  public ResponseEntity<List<MessageResponseAbstract>> getMessages(@RequestParam Long chatId, @RequestParam Long authUserId) {
    User user = userService.findById(authUserId);
    List<Message> messages = messageService.findByChatId(chatId);
    List<MessageResponseAbstract> messageResponses = messages.stream()
      .map(m -> {
        ChatType type = m.getChat().getType();

        if (type.equals(ChatType.PRIVATE)) {
          return privateMessageResponseMapper.convertToDto(m, user);
        }
        return groupMessageResponseMapper.convertToDto(m, user);

      })
      .toList();

    return ResponseEntity.ok(messageResponses);
  }

/*  @PostMapping("/messages")
  public ResponseEntity<MessageResponse> saveMessage(@RequestBody MessageRequest messageRequest) {
    Message message = messageRequestMapper.convertToEntity(messageRequest);
//    rabbitTemplate.convertAndSend("messages", message);
    Message savedMessage = messageService.save(message);
    return ResponseEntity.ok(messageResponseMapper.convertToDto(savedMessage));
  }*/

  @MessageMapping("/message")
  public void saveNewMessage(@RequestBody MessageRequest messageRequest) {
    String oldKey = messageRequest.getKey();
    Message message = messageRequestMapper.convertToEntity(messageRequest);
    Message savedMessage = messageService.save(message);
    ChatType type = savedMessage.getChat().getType();
    List<User> users = chatService.findById(messageRequest.getChatId()).getUsers();

    users.forEach(user -> {
      MessageResponseAbstract responseAbstract;

      if (type.equals(ChatType.PRIVATE)) {
        responseAbstract = privateMessageResponseMapper.convertToDto(savedMessage, user);
      } else {
        responseAbstract = groupMessageResponseMapper.convertToDto(savedMessage, user);
      }
      responseAbstract.setOldKey(oldKey);
      simpMessagingTemplate.convertAndSend("/queue/chat.user." + user.getId(),
        ResponseEntity.ok(responseAbstract));
    });
  }

  @MessageMapping("/message/seen")
  public void setSeenMessage(@RequestBody MessageSeenRequest messageSeenRequest) {
    MessageSeen messageSeen = messageSeenRequestMapper.convertToEntity(messageSeenRequest);

    MessageSeen savedMessageSeen = messageService.saveMessageSeen(messageSeen);
    System.out.println(savedMessageSeen);
    simpMessagingTemplate.convertAndSend("/queue/chat.user." + savedMessageSeen.getMessage().getUser().getId(),
      ResponseEntity.ok(messageSeenResponseMapper.convertToDto(savedMessageSeen)));
  }

//  @GetMapping("/test")
//  public List<Chat> test(@RequestParam Long userId){
//    return chatService.test(userId);
//  }
}
