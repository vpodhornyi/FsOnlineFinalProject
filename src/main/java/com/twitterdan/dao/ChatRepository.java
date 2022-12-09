package com.twitterdan.dao;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ChatRepository extends JpaRepository<Chat, Long> {
  Optional<List<Chat>> findByUsersId(Long id);
}
