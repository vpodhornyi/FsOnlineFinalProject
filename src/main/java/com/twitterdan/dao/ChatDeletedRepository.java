package com.twitterdan.dao;

import com.twitterdan.domain.chat.ChatDeleted;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatDeletedRepository extends JpaRepository<ChatDeleted, Long> {
  @Modifying
  @Query(value = " delete from chats_deleted cd" + " where cd.user_id = :userId and cd.chat_id = :chatId",
          nativeQuery = true)
  void deleteByUserIdAndChatId(@Param("userId") Long userId, @Param("chatId") Long chatId);
}
