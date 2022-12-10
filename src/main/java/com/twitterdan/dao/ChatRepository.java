package com.twitterdan.dao;

import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.chat.ChatType;
import com.twitterdan.domain.chat.Message;
import com.twitterdan.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ChatRepository extends JpaRepository<Chat, Long> {
  Optional<List<Chat>> findByUsersId(Long id);

  @Query("Select c from Chat c join c.users u where c.type = ?1 and u.id = ?2 or u.id = ?3 group by c having count(c) = 2")
  Optional<Chat> findPrivateChatByUsersIds(ChatType type, Long authUserId, Long guestUserId);
}
