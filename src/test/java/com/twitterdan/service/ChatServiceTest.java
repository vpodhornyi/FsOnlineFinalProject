package com.twitterdan.service;

import com.twitterdan.dao.ChatRepository;
import com.twitterdan.dao.UserRepository;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.service.ChatService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class ChatServiceTest {

  @Mock
  private ChatRepository chatRepository;
  @Mock
  private UserRepository userRepository;
//  @InjectMocks
  private ChatService chatService;

  @Test
  public void test_save_success() {

  }

  @Test
  public void test_findAlLByUserId_success() {
    List<Chat> alLByUserId = chatService.findAlLByUserId(1L);
    System.out.println(alLByUserId.size());
  }
}
