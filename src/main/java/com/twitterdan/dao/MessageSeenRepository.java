package com.twitterdan.dao;

import com.twitterdan.domain.chat.MessageSeen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageSeenRepository extends JpaRepository<MessageSeen, Long> {
  Optional<MessageSeen> findByUserIdAndMessageId(Long userId, Long messageId);
}
