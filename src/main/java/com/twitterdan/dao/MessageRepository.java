package com.twitterdan.dao;

import com.twitterdan.domain.chat.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
  @Query(value = " SELECT m.id, m.uuid, m.created_at, m.created_by, m.updated_at, m.updated_by,"
          + " m.text, m.user_id, m.chat_id from messages m" + " where m.chat_id = :chatId"
          + " and (select md1.id from messages_deleted md1 where md1.user_id = :userId and md1.message_id = m.id) is null"
          + " order by m.created_at desc", countQuery = "select count(m.id) from messages m where m.chat_id = :chatId "
          + " and (select md1.id from messages_deleted md1 where md1.user_id = :userId and md1.message_id = m.id) is null",
          nativeQuery = true)
  Optional<Page<Message>> findPageByChatId(Long chatId, Long userId, Pageable pageable);

  @Query(value = " SELECT * from messages m" + " where m.chat_id = :chatId"
          + " and (select md1.id from messages_deleted md1 where md1.user_id = :userId and md1.message_id = m.id) is null"
          + " order by m.created_at", nativeQuery = true)
  Optional<List<Message>> findByChatId(Long chatId, Long userId);

  @Query(value = " select * from messages m" + " where m.chat_id = :chatId"
          + " and (select md1.id from messages_deleted md1 where md1.user_id = :userId and md1.message_id = m.id) is null"
          + " order by m.created_at desc limit 1", nativeQuery = true)
  Optional<Message> findLastChatMessageForUser(Long chatId, Long userId);

  Optional<Message> findFirstByChatIdOrderByCreatedAtDesc(Long chatId);

  @Query(value = " select m.id, m.created_at, m.updated_at, m.created_by,"
          + " m.updated_by, m.uuid, m.text, m.chat_id, m.user_id" + " from messages m"
          + " join messages_seen ms on m.id = ms.message_id" + " where m.chat_id = :chatId" + " and ms.user_id = :userId"
          + " and (select md1.id from messages_deleted md1 where md1.user_id = :userId and md1.message_id = m.id) is null"
          + " order by m.id desc" + " limit 1", nativeQuery = true)
  Optional<Message> findLastSeenChatMessage(Long userId, Long chatId);

  @Query(value = " select count(m.id) M1" + " from messages m" + " where m.chat_id = :chatId" + " and m.user_id != :userId"
          + " and m.id > COALESCE((select m.id" + "                      from messages m"
          + "                               join messages_seen ms on m.id = ms.message_id"
          + "                      where m.chat_id = :chatId" + "                        and ms.user_id = :userId"
          + "                      order by m.id desc" + "                      limit 1), 0)", nativeQuery = true)
  Optional<Integer> getCountUnreadMessages(Long chatId, Long userId);
}
