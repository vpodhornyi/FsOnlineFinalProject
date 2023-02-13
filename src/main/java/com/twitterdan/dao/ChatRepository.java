package com.twitterdan.dao;

import com.twitterdan.domain.chat.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

  @Query(value = " select c.id, c.uuid, c.title, c.type,"
          + " c.created_at, c.created_by, c.updated_at, c.updated_by, c.avatar_img_url" + " from chats c"
          + " left join messages m on c.id = m.chat_id" + " join chats_users cu on c.id = cu.chats_id"
          + " join users u on u.id = cu.users_id" + " left join chats_deleted cd on cd.chat_id = c.id"
          + " where u.id = :userId and (cd.id is null or cd.user_id != :userId)" + " group by c.id"
          + " order by MAX(m.created_at) desc NULLS LAST ", countQuery =
          "select count(c.id) from chats c left join messages m on c.id = m.chat_id "
                  + "join chats_users cu on c.id = cu.chats_id"
                  + " join users u on u.id = cu.users_id left join chats_deleted cd"
                  + " on cd.chat_id = c.id where u.id = :userId "
                  + " and (cd.id is null or cd.user_id != :userId) group by c.id", nativeQuery = true)
  Optional<Page<Chat>> findByUsersIdPageable(@Param("userId") Long userId, Pageable pageable);

  @Query(value = " select c.id, c.uuid, c.title, c.type,"
          + " c.created_at, c.created_by, c.updated_at, c.updated_by, c.avatar_img_url" + " from chats c"
          + " left join messages m on c.id = m.chat_id" + " join chats_users cu on c.id = cu.chats_id"
          + " join users u on u.id = cu.users_id" + " left join chats_deleted cd on cd.chat_id = c.id"
          + " where u.id = :userId and (cd.id is null or cd.user_id != :userId)" + " group by c.id"
          + " order by MAX(m.created_at) desc NULLS LAST ", countQuery =
          "select count(c.id) from chats c left join messages m on c.id = m.chat_id join chats_users cu"
                  + " on c.id = cu.chats_id"
                  + " join users u on u.id = cu.users_id left join chats_deleted cd "
                  + "on cd.chat_id = c.id where u.id = :userId "
                  + " and (cd.id is null or cd.user_id != :userId) group by c.id", nativeQuery = true)
  Optional<List<Chat>> findByUsersId(@Param("userId") Long userId);

  @Query(value = " select * from (select * from chats c " + " join chats_users cu on c.id = cu.chats_id"
          + " where c.type = :type and cu.users_id = :authUserId) a " +
          " where id in (select c.id from chats c "
          + " join chats_users cu on c.id = cu.chats_id " +
          " where c.type = :type and cu.users_id = :guestUserId)",
          nativeQuery = true)
  Optional<Chat> findPrivateChatByUsersIds(String type, Long authUserId, Long guestUserId);
}
