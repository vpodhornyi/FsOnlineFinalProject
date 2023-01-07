package com.twitterdan.controller;

import com.twitterdan.domain.chat.*;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.request.*;
import com.twitterdan.dto.chat.response.chat.*;
import com.twitterdan.dto.chat.response.message.DeletedMessageResponse;
import com.twitterdan.dto.chat.response.message.MessageResponseAbstract;
import com.twitterdan.dto.chat.response.seen.ForeignerMessageSeenResponse;
import com.twitterdan.facade.chat.request.MessageRequestMapper;
import com.twitterdan.facade.chat.response.chat.AddNewUserResponseMapper;
import com.twitterdan.facade.chat.response.message.DeletedMessageResponseMapper;
import com.twitterdan.facade.chat.response.chat.GroupChatResponseMapper;
import com.twitterdan.facade.chat.response.chat.LeaveChatResponseMapper;
import com.twitterdan.facade.chat.response.chat.PrivateChatResponseMapper;
import com.twitterdan.facade.chat.response.message.*;
import com.twitterdan.facade.chat.request.GroupChatRequestMapper;
import com.twitterdan.facade.chat.request.MessageSeenRequestMapper;
import com.twitterdan.facade.chat.request.PrivateChatRequestMapper;
import com.twitterdan.facade.chat.response.seen.ForeignerMessageSeenResponseMapper;
import com.twitterdan.facade.chat.response.seen.MessageOwnerSeenResponseMapper;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.MessageService;
import com.twitterdan.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/chats")
public class ChatController {
  private final String queue = "/queue/user.";
  private final ChatService chatService;
  private final UserService userService;
  private final MessageService messageService;
  private final MessageRequestMapper messageRequestMapper;
  private final PrivateChatResponseMapper privateChatResponseMapper;
  private final GroupChatResponseMapper groupChatResponseMapper;
  private final PrivateChatRequestMapper privateChatRequestMapper;
  private final GroupChatRequestMapper groupChatRequestMapper;
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final PrivateMessageOwnerResponseMapper privateMessageOwnerResponseMapper;
  private final PrivateForeignerMessageResponseMapper privateForeignerMessageResponseMapper;
  private final GroupMessageOwnerResponseMapper groupMessageOwnerResponseMapper;
  private final GroupForeignerMessageResponseMapper groupForeignerMessageResponseMapper;
  private final MessageOwnerSeenResponseMapper messageOwnerSeenResponseMapper;
  private final ForeignerMessageSeenResponseMapper foreignerMessageSeenResponseMapper;
  private final MessageSeenRequestMapper messageSeenRequestMapper;
  private final DeletedMessageResponseMapper deletedMessageMapper;
  private final LeaveChatResponseMapper leaveChatResponseMapper;

  @GetMapping
  public ResponseEntity<List<ChatResponseAbstract>> getChats(@RequestParam int pageNumber, @RequestParam int pageSize, Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    List<ChatResponseAbstract> chats = chatService.findAlLByUserId(authUser.getId(), pageNumber, pageSize).stream().map(ch -> {
      if (ch.getType().equals(ChatType.PRIVATE)) {
        return privateChatResponseMapper.convertToDto(ch, authUser);
      }
      return groupChatResponseMapper.convertToDto(ch, authUser);
    }).toList();
    return ResponseEntity.ok(chats);
  }

  @DeleteMapping
  public ResponseEntity<LeaveChatResponse> leaveChat(@RequestBody LeaveChatRequest leaveChatRequest, Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    Long chatId = leaveChatRequest.getChatId();
    LeaveChatResponse leaveChatResponse = null;

    if (leaveChatRequest.isGroupChat()) {
      Chat chat = chatService.deleteUserFromGroupChat(chatId, authUser);
      LeaveChatResponse finalLeaveChatResponse = leaveChatResponseMapper.convertToDto(chat, authUser);
      chat.getUsers().forEach(u -> simpMessagingTemplate.convertAndSend(queue + u.getId(), ResponseEntity.ok(finalLeaveChatResponse)));
      return ResponseEntity.ok(finalLeaveChatResponse);
    }

    if (leaveChatRequest.isPrivateChat()) {
      Chat chat = chatService.deleteUserFromPrivateChat(chatId, authUser);
      leaveChatResponse = leaveChatResponseMapper.convertToDto(chat, authUser);
    }

    return ResponseEntity.ok(leaveChatResponse);
  }

  @GetMapping("/private")
  public ResponseEntity<ChatResponseAbstract> findPrivateChat(@RequestParam Long guestUserId, Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    return ResponseEntity.ok(privateChatResponseMapper.convertToDto(chatService.findPrivateChatByUsersIds(authUser.getId(), guestUserId), authUser));
  }

  @PostMapping("/private")
  public ResponseEntity<PrivateChatResponse> addPrivateChat(@RequestBody PrivateChatRequest privateChatRequest, Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    Chat chat = privateChatRequestMapper.convertToEntity(privateChatRequest, authUser);
    Chat savedChat = chatService.savePrivateChat(chat);
    String oldKey = privateChatRequest.getOldKey();
    Long guestUserId = privateChatRequest.getGuestUserId();
    String text = privateChatRequest.getMessage();
    User guestUser = userService.findById(guestUserId);
    messageService.save(new Message(text, savedChat, authUser));

    PrivateChatResponse privateChatResponseAuth = privateChatResponseMapper.convertToDto(savedChat, authUser);
    PrivateChatResponse privateChatResponseGuest = privateChatResponseMapper.convertToDto(savedChat, guestUser);
    privateChatResponseAuth.setOldKey(oldKey);
    privateChatResponseGuest.setOldKey(oldKey);
    simpMessagingTemplate.convertAndSend(queue + guestUserId, ResponseEntity.ok(privateChatResponseGuest));

    return ResponseEntity.ok(privateChatResponseAuth);
  }

  @PostMapping("/group")
  public ResponseEntity<GroupChatResponse> addGroupChat(@RequestBody GroupChatRequest groupChatRequest, Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    String oldKey = groupChatRequest.getOldKey();
    String text = groupChatRequest.getMessage();
    Chat chat = groupChatRequestMapper.convertToEntity(groupChatRequest, authUser);
    Chat savedChat = chatService.saveChat(chat);
    messageService.save(new Message(text, savedChat, authUser));

    savedChat.getUsers().stream().filter(u -> !u.equals(authUser)).forEach(user -> {
      GroupChatResponse groupChatResponse = groupChatResponseMapper.convertToDto(savedChat, user);
      groupChatResponse.setOldKey(oldKey);
      simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(groupChatResponse));
    });

    GroupChatResponse groupChatResponse = groupChatResponseMapper.convertToDto(savedChat, authUser);
    groupChatResponse.setOldKey(oldKey);

    return ResponseEntity.ok(groupChatResponse);
  }

  @PostMapping("/add-users")
  public ResponseEntity<AddNewUserResponse> addUserToGroup(@RequestBody AddUsersToGroupRequest addUsersToGroupRequest, Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    Long chatId = addUsersToGroupRequest.getChatId();
    Chat oldChat = chatService.findById(chatId);
    List<Long> ids = oldChat.getUsers().stream().map(User::getId).toList();

    List<User> usersForAdd = addUsersToGroupRequest.getUsersIds().stream()
      .filter(id -> ids.stream().filter(i -> Objects.equals(i, id)).findFirst().isEmpty())
      .map(userService::findById)
      .toList();

    Chat savedChat = chatService.addUsersToChat(chatId, usersForAdd);
    savedChat.getUsers().stream().filter(u -> !u.equals(authUser)).forEach(user -> {
      simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(null));
    });

    usersForAdd.forEach(user -> {
      GroupChatResponse groupChatResponse = groupChatResponseMapper.convertToDto(savedChat, user);
      simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(groupChatResponse));
    });

    return ResponseEntity.ok(null);
  }

  @GetMapping("/messages")
  public ResponseEntity<List<MessageResponseAbstract>> getMessages(@RequestParam Long chatId, Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    List<Message> messages = messageService.findByChatId(chatId, authUser.getId());
    List<MessageResponseAbstract> messageResponses = messages.stream().map(message -> {
      ChatType type = message.getChat().getType();

      if (type.equals(ChatType.PRIVATE)) {
        if (authUser.equals(message.getUser())) {
          return privateMessageOwnerResponseMapper.convertToDto(message, authUser);
        } else {
          return privateForeignerMessageResponseMapper.convertToDto(message, authUser);
        }
      }

      if (authUser.equals(message.getUser())) {
        return groupMessageOwnerResponseMapper.convertToDto(message, authUser);
      } else {
        return groupForeignerMessageResponseMapper.convertToDto(message, authUser);
      }

    }).toList();

    return ResponseEntity.ok(messageResponses);
  }

  @PostMapping("/messages")
  public ResponseEntity<MessageResponseAbstract> saveNewMessage(@RequestBody MessageRequest messageRequest, Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    String oldKey = messageRequest.getKey();
    Message message = messageRequestMapper.convertToEntity(messageRequest, authUser);
    Message savedMessage = messageService.save(message);
    ChatType type = savedMessage.getChat().getType();
    List<User> users = chatService.findById(messageRequest.getChatId()).getUsers();

    users.stream().filter(u -> !u.equals(authUser)).forEach(user -> {
      MessageResponseAbstract responseAbstract;

      if (type.equals(ChatType.PRIVATE)) {
        if (user.equals(savedMessage.getUser())) {
          responseAbstract = privateMessageOwnerResponseMapper.convertToDto(savedMessage, user);
        } else {
          responseAbstract = privateForeignerMessageResponseMapper.convertToDto(savedMessage, user);
        }
      } else {
        if (user.equals(savedMessage.getUser())) {
          responseAbstract = groupMessageOwnerResponseMapper.convertToDto(savedMessage, user);
        } else {
          responseAbstract = groupForeignerMessageResponseMapper.convertToDto(savedMessage, user);
        }
      }
      responseAbstract.setOldKey(oldKey);
      simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(responseAbstract));
    });

    MessageResponseAbstract responseAbstract;

    if (type.equals(ChatType.PRIVATE)) {
      responseAbstract = privateMessageOwnerResponseMapper.convertToDto(savedMessage, authUser);


    } else {
      responseAbstract = groupMessageOwnerResponseMapper.convertToDto(savedMessage, authUser);
    }
    responseAbstract.setOldKey(oldKey);

    return ResponseEntity.ok(responseAbstract);
  }

  @DeleteMapping("/messages")
  public ResponseEntity<DeletedMessageResponse> deleteMessage(@RequestBody DeleteMessageRequest deleteMessageRequest, Principal principal) {
    Long messageId = deleteMessageRequest.getMessageId();
    Message message = messageService.findById(messageId);
    User authUser = userService.findByUserTag(principal.getName());

    if (deleteMessageRequest.isDeleteForYou()) {
      Message updatedMessage = messageService.deleteMessageForAuthUser(message, authUser);
      return ResponseEntity.ok(deletedMessageMapper.convertToDto(updatedMessage, authUser));
    }

    if (deleteMessageRequest.isDeleteForAll()) {
      messageService.deleteMessageForAll(messageId, authUser);
      List<User> users = message.getChat().getUsers();
      users.stream().filter(u -> !u.equals(authUser)).forEach(u -> {
        simpMessagingTemplate.convertAndSend(queue + u.getId(), ResponseEntity.ok(deletedMessageMapper.convertToDto(message, u)));
      });
    }

    return ResponseEntity.ok(deletedMessageMapper.convertToDto(message, authUser));
  }

  @PostMapping("/messages/seen")
  public ResponseEntity<ForeignerMessageSeenResponse> setSeenMessage(@RequestBody MessageSeenRequest messageSeenRequest,
                                                                     Principal principal) {
    User authUser = userService.findByUserTag(principal.getName());
    MessageSeen messageSeen = messageSeenRequestMapper.convertToEntity(messageSeenRequest, authUser);

    MessageSeen savedMessageSeen = messageService.saveMessageSeen(messageSeen);
    Long userId = savedMessageSeen.getMessage().getUser().getId();
    simpMessagingTemplate.convertAndSend(queue + userId, ResponseEntity.ok(messageOwnerSeenResponseMapper.convertToDto(savedMessageSeen)));

    return ResponseEntity.ok(foreignerMessageSeenResponseMapper.convertToDto(savedMessageSeen));
  }

//  @GetMapping("/test")
//  public List<Chat> test(@RequestParam Long userId){
//    return chatService.test(userId);
//  }
}
