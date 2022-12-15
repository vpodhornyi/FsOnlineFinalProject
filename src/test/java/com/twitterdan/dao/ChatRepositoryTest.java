package com.twitterdan.dao;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class ChatRepositoryTest {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private ChatRepository chatRepository;
/*
  @Test
  public void test_findByUsersId_success() {
    Optional<List<Chat>> byUsersId = chatRepository.findByUsersId(1L);
    List<Chat> chats = byUsersId.get();

    User user = chats.get(1).getUsers().get(1);
    assertNotNull(user);
  }

  @Test
  public void test_save_success() {
    Chat chat = new Chat();
    chat.setTitle("test_chat");
    chat.setType(ChatType.PRIVATE);
    User Bob = userRepository.findById(1L).get();
    User Noah = userRepository.findById(6L).get();

    List<User> users = new ArrayList<>();
    users.add(Bob);
    users.add(Noah);
    chat.setUsers(users);

    Chat savedChat = chatRepository.save(chat);
    System.out.println(savedChat.getId());
    System.out.println(savedChat.getUsers());
    assertEquals(2, savedChat.getUsers().size());

    Optional<List<Chat>> byUsersId = chatRepository.findByUsersId(6L);
    List<Chat> chats = byUsersId.get();
    assertEquals(1, chats.size());
  }*/

/*  @Test
  public void test_findChatByTypeAndUsers_success() {
    Optional<Chat> optionalChat = chatRepository
      .findPrivateChatByUsersIds(ChatType.PRIVATE, 1L, 5L);

    assertTrue(optionalChat.isPresent());
  }*/
}
