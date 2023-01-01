package com.twitterdan.dao;

import com.twitterdan.domain.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
  Optional<List<Message>> findByChatId(Long id);
  Optional<Message> findFirstByChatIdOrderByCreatedAtDesc(Long id);

  @Query(value =
    " SELECT M1 - M2" +
      " from (select count(m.id) M1" +
      " from messages m" +
      " where chat_id = :chatId and user_id != :userId) a," +
      " (select count(m.id) M2 from messages m" +
      " join messages_seen ms on m.id = ms.message_id" +
      " where chat_id = :chatId and ms.user_id = :userId) b"
    , nativeQuery = true)
  Optional<Integer> getCountUnreadMessages(@Param("chatId") Long chatId, @Param("userId") Long userId);
  @Query(value =
    " SELECT M1 - M2" +
      " from (select count(m.id) M1" +
      " from messages m" +
      " join chats c on c.id = m.chat_id" +
      " join chats_users cu on c.id = cu.chats_id" +
      " join users u on u.id = cu.users_id" +
      " where u.id = :userId and m.user_id != :userId) a," +
      " (select count(m.id) M2 from messages m" +
      " join messages_seen ms on m.id = ms.message_id" +
      " join chats c on c.id = m.chat_id" +
      " where ms.user_id = :userId) b"
    , nativeQuery = true)
  Optional<Integer> getCountAllUnreadMessages(@Param("userId") Long userId);
}

/*
select count(m.id) M1
       from messages m
       join chats c on c.id = m.chat_id
       join chats_users cu on c.id = cu.chats_id
       join users u on u.id = cu.users_id
       where u.id = 2

select count(m.id) M2 from messages m
       join messages_seen ms on m.id = ms.message_id
       join chats c on c.id = m.chat_id
       join chats_users cu on c.id = cu.chats_id
       join users u on u.id = cu.users_id
       where ms.user_id = 2
 */
