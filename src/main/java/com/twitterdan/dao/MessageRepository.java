package com.twitterdan.dao;

import com.twitterdan.domain.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
  Optional<List<Message>> findByChatId(Long id);
  Optional<Message> findFirstByChatIdOrderByCreatedAtDesc(Long id);
}
