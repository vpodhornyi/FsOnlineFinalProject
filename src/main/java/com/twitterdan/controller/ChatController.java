package com.twitterdan.controller;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.chat.MessageSeen;
import com.twitterdan.domain.user.User;
import com.twitterdan.dto.chat.ChatUser;
import com.twitterdan.dto.chat.request.*;
import com.twitterdan.dto.chat.response.chat.*;
import com.twitterdan.dto.chat.response.message.DeletedMessageResponse;
import com.twitterdan.dto.chat.response.message.MessageResponseAbstract;
import com.twitterdan.dto.chat.response.message.PageMessagesResponse;
import com.twitterdan.dto.chat.response.seen.ForeignerMessageSeenResponse;
import com.twitterdan.facade.chat.ChatUserMapper;
import com.twitterdan.facade.chat.request.GroupChatRequestMapper;
import com.twitterdan.facade.chat.request.MessageRequestMapper;
import com.twitterdan.facade.chat.request.MessageSeenRequestMapper;
import com.twitterdan.facade.chat.request.PrivateChatRequestMapper;
import com.twitterdan.facade.chat.response.chat.GroupChatResponseMapper;
import com.twitterdan.facade.chat.response.chat.LeaveChatResponseMapper;
import com.twitterdan.facade.chat.response.chat.PageChatsResponseMapper;
import com.twitterdan.facade.chat.response.chat.PrivateChatResponseMapper;
import com.twitterdan.facade.chat.response.message.*;
import com.twitterdan.facade.chat.response.seen.ForeignerMessageSeenResponseMapper;
import com.twitterdan.facade.chat.response.seen.MessageOwnerSeenResponseMapper;
import com.twitterdan.service.ChatService;
import com.twitterdan.service.CloudinaryService;
import com.twitterdan.service.MessageService;
import com.twitterdan.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

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
  private final ChatUserMapper chatUserMapper;
  private final PageMessagesMapper pageMessagesMapper;
  private final PageChatsResponseMapper pageChatsResponseMapper;
  private final CloudinaryService cloudinaryService;

  @GetMapping
  public ResponseEntity<PageChatResponse> getChats(
          @RequestParam int pageNumber, @RequestParam int pageSize, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Page<Chat> chats = chatService.findAlLByUserId(authUser.getId(), pageNumber, pageSize);

    return ResponseEntity.ok(pageChatsResponseMapper.convertToDto(chats, authUser));
  }

  @DeleteMapping
  public ResponseEntity<LeaveChatResponse> leaveChat(@RequestBody LeaveChatRequest leaveChatRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Long chatId = leaveChatRequest.getChatId();
    LeaveChatResponse leaveChatResponse = null;

    if (leaveChatRequest.isGroupChat()) {
      Chat chat = chatService.deleteUserFromGroupChat(chatId, authUser);
      LeaveChatResponse finalLeaveChatResponse = leaveChatResponseMapper.convertToDto(chat, authUser);
      chat
              .getUsers()
              .forEach(u -> simpMessagingTemplate.convertAndSend(queue + u.getId(),
                      ResponseEntity.ok(finalLeaveChatResponse)));
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
    User authUser = userService.findByUserTagTrowException(principal.getName());
    return ResponseEntity.ok(
            privateChatResponseMapper.convertToDto(chatService.findPrivateChatByUsersIds(authUser.getId(), guestUserId),
                    authUser));
  }

  @PostMapping("/private")
  public ResponseEntity<PrivateChatResponse> addPrivateChat(
          @RequestBody PrivateChatRequest privateChatRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
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
  public ResponseEntity<GroupChatResponse> addGroupChat(
          @RequestBody GroupChatRequest groupChatRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    String oldKey = groupChatRequest.getOldKey();
    String text = groupChatRequest.getMessage();
    Chat chat = groupChatRequestMapper.convertToEntity(groupChatRequest, authUser);
    Chat savedChat = chatService.saveChat(chat);
    messageService.save(new Message(text, savedChat, authUser));

    savedChat.getUsers().stream().filter(u -> ! u.equals(authUser)).forEach(user -> {
      GroupChatResponse groupChatResponse = groupChatResponseMapper.convertToDto(savedChat, user);
      groupChatResponse.setOldKey(oldKey);
      simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(groupChatResponse));
    });

    GroupChatResponse groupChatResponse = groupChatResponseMapper.convertToDto(savedChat, authUser);
    groupChatResponse.setOldKey(oldKey);

    return ResponseEntity.ok(groupChatResponse);
  }

  @PutMapping("/group")
  public ResponseEntity<GroupChatResponse> editGroupChat(
          @RequestParam MultipartFile uploadFile, @RequestParam String name, @RequestParam Long chatId,
          Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    String imgUrl = cloudinaryService.uploadImage(uploadFile);
    Chat chat = chatService.editGroupChat(chatId, name, imgUrl, authUser);

    chat.getUsers().stream().filter(u -> ! u.equals(authUser)).forEach(user -> {
      GroupChatResponse groupChatResponse = groupChatResponseMapper.convertToDto(chat, user);
      simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(groupChatResponse));
    });

    return ResponseEntity.ok(groupChatResponseMapper.convertToDto(chat, authUser));
  }

  @PostMapping("/add-users")
  public ResponseEntity<AddUsersToGroupResponse> addUserToGroup(
          @RequestBody AddUsersToGroupRequest addUsersToGroupRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Long chatId = addUsersToGroupRequest.getChatId();
    Chat oldChat = chatService.findById(chatId);
    List<Long> ids = oldChat.getUsers().stream().map(User::getId).toList();

    List<User> usersForAdd = addUsersToGroupRequest.getUsersIds().stream()
            .filter(id -> ids.stream().filter(i -> Objects.equals(i, id)).findFirst().isEmpty()).map(userService::findById)
            .toList();
    List<ChatUser> chatUsers = usersForAdd.stream().map(chatUserMapper::convertToDto).toList();

    Chat savedChat = chatService.addUsersToChat(chatId, usersForAdd);
    oldChat.getUsers().stream()
            .filter(u -> ! u.equals(authUser))
            .forEach(user ->
                    simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(
                    new AddUsersToGroupResponse(chatId, chatUserMapper.convertToDto(authUser), chatUsers))));

    usersForAdd.forEach(user -> {
      GroupChatResponse groupChatResponse = groupChatResponseMapper.convertToDto(savedChat, user);
      simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(groupChatResponse));
    });

    return ResponseEntity.ok(new AddUsersToGroupResponse(chatId, chatUserMapper.convertToDto(authUser), chatUsers));
  }

  @GetMapping("/messages")
  public ResponseEntity<PageMessagesResponse> getMessages(
          @RequestParam int pageNumber, @RequestParam int pageSize, @RequestParam Long chatId, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Page<Message> messages = messageService.findByChatId(chatId, authUser.getId(), pageNumber, pageSize);

    return ResponseEntity.ok(pageMessagesMapper.convertToDto(messages, authUser));
  }

  @PostMapping("/messages")
  public ResponseEntity<MessageResponseAbstract> saveNewMessage(
          @RequestBody MessageRequest messageRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    String oldKey = messageRequest.getKey();
    Message message = messageRequestMapper.convertToEntity(messageRequest, authUser);
    Message savedMessage = messageService.save(message);
    ChatType type = savedMessage.getChat().getType();
    List<User> users = chatService.findById(messageRequest.getChatId()).getUsers();

    users.stream().filter(u -> ! u.equals(authUser)).forEach(user -> {
      MessageResponseAbstract responseAbstract =
              type.equals(ChatType.PRIVATE) ? privateForeignerMessageResponseMapper.convertToDto(savedMessage, user) :
                      groupForeignerMessageResponseMapper.convertToDto(savedMessage, user);
      simpMessagingTemplate.convertAndSend(queue + user.getId(), ResponseEntity.ok(responseAbstract));
    });

    MessageResponseAbstract responseAbstract =
            type.equals(ChatType.PRIVATE) ? privateMessageOwnerResponseMapper.convertToDto(savedMessage, authUser) :
                    groupMessageOwnerResponseMapper.convertToDto(savedMessage, authUser);
    responseAbstract.setOldKey(oldKey);

    return ResponseEntity.ok(responseAbstract);
  }

  @DeleteMapping("/messages")
  public ResponseEntity<DeletedMessageResponse> deleteMessage(
          @RequestBody DeleteMessageRequest deleteMessageRequest, Principal principal) {
    Long messageId = deleteMessageRequest.getMessageId();
    Message message = messageService.findById(messageId);
    User authUser = userService.findByUserTagTrowException(principal.getName());

    if (deleteMessageRequest.isDeleteForYou()) {
      Message updatedMessage = messageService.deleteMessageForAuthUser(message, authUser);
      return ResponseEntity.ok(deletedMessageMapper.convertToDto(updatedMessage, authUser));
    }

    if (deleteMessageRequest.isDeleteForAll()) {
      messageService.deleteMessageForAll(messageId, authUser);
      List<User> users = message.getChat().getUsers();
      users.stream().filter(u -> ! u.equals(authUser)).forEach(u -> {
        simpMessagingTemplate.convertAndSend(queue + u.getId(),
                ResponseEntity.ok(deletedMessageMapper.convertToDto(message, u)));
      });
    }

    return ResponseEntity.ok(deletedMessageMapper.convertToDto(message, authUser));
  }

  @PostMapping("/messages/seen")
  public ResponseEntity<ForeignerMessageSeenResponse> setSeenMessage(
          @RequestBody MessageSeenRequest messageSeenRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    MessageSeen messageSeen = messageSeenRequestMapper.convertToEntity(messageSeenRequest, authUser);

    MessageSeen savedMessageSeen = messageService.saveMessageSeen(messageSeen);
    Long userId = savedMessageSeen.getMessage().getUser().getId();
    simpMessagingTemplate.convertAndSend(queue + userId,
            ResponseEntity.ok(messageOwnerSeenResponseMapper.convertToDto(savedMessageSeen)));

    return ResponseEntity.ok(foreignerMessageSeenResponseMapper.convertToDto(savedMessageSeen));
  }
}
