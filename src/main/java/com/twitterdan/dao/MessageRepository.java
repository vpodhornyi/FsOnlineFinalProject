package com.twitterdan.dao;

import com.twitterdan.domain.chat.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
  @Query(value =
    " SELECT m.id, m.uuid, m.created_at, m.created_by, m.updated_at, m.updated_by," +
      " m.text, m.user_id, m.chat_id from messages m" +
      " left join messages_deleted md on m.id = md.message_id" +
      " where m.chat_id = :chatId and (md.user_id != :userId or md.user_id is null)" +
      " order by m.created_at desc"
    , nativeQuery = true)
  Optional<Page<Message>> findPageByChatId(@Param("chatId") Long chatId, @Param("userId") Long userId, Pageable pageable);

  @Query(value =
    " SELECT * from messages m" +
      " left join messages_deleted md on m.id = md.message_id" +
      " where m.chat_id = :chatId and (md.user_id != :userId or md.user_id is null)" +
      " order by m.created_at"
    , nativeQuery = true)
  Optional<List<Message>> findByChatId(Long chatId, Long userId);

    @Query(value =
    " select * from messages m" +
      " left join messages_deleted md on m.id = md.message_id" +
      " where m.chat_id = :chatId and (md.user_id != :userId or md.user_id is null)" +
      " order by m.created_at desc limit 1"
    , nativeQuery = true)
  Optional<Message> findLastChatMessageForUser(Long chatId, Long userId);

  Optional<Message> findFirstByChatIdOrderByCreatedAtDesc(Long chatId);

  @Query(value =
    " select m.id, m.created_at, m.updated_at, m.created_by," +
      " m.updated_by, m.uuid, m.text, m.chat_id, m.user_id" +
      " from messages m" +
      " join messages_seen ms on m.id = ms.message_id" +
      " left join messages_deleted md on m.id = md.message_id" +
      " where m.chat_id = :chatId" +
      " and ms.user_id = :userId" +
      " and (md.user_id != :userId or md.user_id is null)" +
      " order by m.id desc" +
      " limit 1"
    , nativeQuery = true)
  Optional<Message> findLastSeenChatMessage(Long userId, Long chatId);

  /*
  select m.id, m.created_at, m.updated_at, m.created_by,
          m.updated_by, m.uuid, m.text, m.chat_id, m.user_id
   from messages m
            join messages_seen ms on m.id = ms.message_id
            left join messages_deleted md on m.id = md.message_id
   where m.chat_id = 4
     and ms.user_id = 1
     and (md.user_id != 1 or md.user_id is null)
   order by m.id desc
   limit 1;

   */
/*  @Query(value =
    " SELECT M1 - M2" +
      " from (select count(m.id) M1" +
      " from messages m" +
      " where m.chat_id = :chatId" +
      " and m.user_id != :userId" +
      " and m.id > COALESCE((select m.id" +
      "                      from messages m" +
      "                               join messages_seen ms on m.id = ms.message_id" +
      "                      where m.chat_id = :chatId" +
      "                        and ms.user_id = :userId" +
      "                      order by m.id desc" +
      "                      limit 1), 0)) a," +
      " (select count(m.id) M2" +
      " from messages m" +
      "         join messages_seen ms on m.id = ms.message_id" +
      " where m.chat_id = :chatId" +
      " and ms.user_id = :userId" +
      " and m.id > COALESCE((select m.id" +
      "                       from messages m" +
      "                                join messages_seen ms on m.id = ms.message_id" +
      "                       where m.chat_id = :chatId" +
      "                         and ms.user_id = :userId" +
      "                       order by m.id desc" +
      "                       limit 1), 0)) b"
    , nativeQuery = true)*/
  @Query(value =
    " select count(m.id) M1" +
      " from messages m" +
      " where m.chat_id = :chatId" +
      " and m.user_id != :userId" +
      " and m.id > COALESCE((select m.id" +
      "                      from messages m" +
      "                               join messages_seen ms on m.id = ms.message_id" +
      "                      where m.chat_id = :chatId" +
      "                        and ms.user_id = :userId" +
      "                      order by m.id desc" +
      "                      limit 1), 0)"
    , nativeQuery = true)
  Optional<Integer> getCountUnreadMessages(Long chatId, Long userId);

  @Query(value =
    " SELECT M1 - M2" +
      " from (select count(m.id) M1" +
      " from messages m" +
      "         join chats c on c.id = m.chat_id" +
      "         join chats_users cu on c.id = cu.chats_id" +
      "         join users u on u.id = cu.users_id" +
      "         left join messages_deleted md on m.id = md.message_id" +
      " where u.id = :userId" +
      " and m.user_id != :userId" +
      " and (md.user_id != :userId or md.user_id is null)" +
      " and m.id > COALESCE((select m1.id" +
      "              from messages m1" +
      "                       join messages_seen ms on m1.id = ms.message_id" +
      "              where m1.chat_id = m.chat_id" +
      "                and ms.user_id = m.user_id" +
      "              order by m1.id desc" +
      "              limit 1), 0)) a," +
      " (select count(m.id) M2" +
      " from messages m" +
      "         join chats c on c.id = m.chat_id" +
      "         join chats_users cu on c.id = cu.chats_id" +
      "         join users u on u.id = cu.users_id" +
      "         join messages_seen ms on m.id = ms.message_id" +
      "         left join messages_deleted md on m.id = md.message_id" +
      " where u.id = :userId" +
      " and ms.user_id = :userId" +
      " and (md.user_id != :userId or md.user_id is null)" +
      " and m.id > COALESCE((select m1.id" +
      "              from messages m1" +
      "                       join messages_seen ms on m1.id = ms.message_id" +
      "              where m1.chat_id = m.chat_id" +
      "                and ms.user_id = m.user_id" +
      "              order by m1.id desc" +
      "              limit 1), 0)) b"
    , nativeQuery = true)
  Optional<Integer> getCountAllUnreadMessages(Long userId);
}

/*
select count(m.id) M1
       from messages m
       join chats c on c.id = m.chat_id
       join chats_users cu on c.id = cu.chats_id
       join users u on u.id = cu.users_id
       left join messages_deleted md on m.id = md.message_id
       where u.id = 2 and m.user_id != 2 and (md.user_id != 2 or md.user_id is null);



select count(m.id) M2 from messages m
       join chats c on c.id = m.chat_id
       join chats_users cu on c.id = cu.chats_id
       join users u on u.id = cu.users_id
       join messages_seen ms on m.id = ms.message_id
       left join messages_deleted md on m.id = md.message_id
       where u.id = 2  and (md.user_id != 2 or md.user_id is null);

       select count(m.id) M1
from messages m
         join chats c on c.id = m.chat_id
         join chats_users cu on c.id = cu.chats_id
         join users u on u.id = cu.users_id
         left join messages_deleted md on m.id = md.message_id
where u.id = 4
  and m.user_id != 4
  and (md.user_id != 4 or md.user_id is null);

SELECT *
from messages m
         left join messages_deleted md on m.id = md.message_id
where m.chat_id = 1;


select count(mm.id) M1
from messages mm
where mm.chat_id = 1
  and mm.user_id != 4
  and mm.id > (select m.id
                      from messages m
                               join messages_seen ms on m.id = ms.message_id
                      where m.chat_id = mm.chat_id
                        and ms.user_id = mm.user_id
                      order by m.id desc
                      limit 1);


select m.id
from messages m
         join messages_seen ms on m.id = ms.message_id
where m.chat_id = 1
  and ms.user_id = 4
order by m.id desc
limit 1;

select count(m.id) M2
from messages m
         join messages_seen ms on m.id = ms.message_id
where m.chat_id = 1
  and ms.user_id = 4
  and m.id > (select m.id
                       from messages m
                                join messages_seen ms on m.id = ms.message_id
                       where m.chat_id = 1
                         and ms.user_id = 4
                       order by m.id desc
                       limit 1);


select count(m.id) M1
from messages m
         join chats c on c.id = m.chat_id
         join chats_users cu on c.id = cu.chats_id
         join users u on u.id = cu.users_id
         left join messages_deleted md on m.id = md.message_id
where u.id = 1
  and m.user_id != 1
  and (md.user_id != 1 or md.user_id is null)
  and m.id > COALESCE((select m1.id
              from messages m1
                       join messages_seen ms on m1.id = ms.message_id
              where m1.chat_id = m.chat_id
                and ms.user_id = m.user_id
              order by m1.id desc
              limit 1), 0);

select count(m.id) M2
from messages m
         join chats c on c.id = m.chat_id
         join chats_users cu on c.id = cu.chats_id
         join users u on u.id = cu.users_id
         join messages_seen ms on m.id = ms.message_id
         left join messages_deleted md on m.id = md.message_id
where u.id = 1
  and ms.user_id = 1
  and (md.user_id != 1 or md.user_id is null)
  and m.id > COALESCE((select m1.id
              from messages m1
                       join messages_seen ms on m1.id = ms.message_id
              where m1.chat_id = m.chat_id
                and ms.user_id = m.user_id
              order by m1.id desc
              limit 1), 0);
 */
