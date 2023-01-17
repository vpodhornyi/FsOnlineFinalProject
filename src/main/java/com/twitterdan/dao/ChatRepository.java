package com.twitterdan.dao;

import com.twitterdan.domain.chat.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

  @Query(value =
    " select c.id, c.uuid, c.title, c.type," +
      " c.created_at, c.created_by, c.updated_at, c.updated_by, c.avatar_img_url" +
      " from chats c" +
      " left join messages m on c.id = m.chat_id" +
      " join chats_users cu on c.id = cu.chats_id" +
      " join users u on u.id = cu.users_id" +
      " left join chats_deleted cd on cd.chat_id = c.id" +
      " where u.id = :userId and (cd.id is null or cd.user_id != :userId)" +
      " group by c.id" +
      " order by MAX(m.created_at) desc NULLS LAST ",
    countQuery = "select count(c.id) from chats c left join messages m on c.id = m.chat_id join chats_users cu on c.id = cu.chats_id" +
      " join users u on u.id = cu.users_id left join chats_deleted cd on cd.chat_id = c.id where u.id = :userId " +
      " and (cd.id is null or cd.user_id != :userId) group by c.id",
    nativeQuery = true)
  Optional<Page<Chat>> findByUsersId(@Param("userId") Long userId, Pageable pageable);

  /*
  select c.id, c.uuid, c.title, c.type,
       c.created_at, c.created_by, c.updated_at, c.updated_by
       from chats c
       left join messages m on c.id = m.chat_id
       join chats_users cu on c.id = cu.chats_id
       join users u on u.id = cu.users_id
       left join chat_deleted cd on cd.chat_id = c.id
       where u.id = 1 and (cd.id is null or cd.user_id != 1)
       group by c.id
       order by MAX(m.created_at) desc NULLS LAST
   */
  @Query(value =
    " select * from (select * from chats c " +
      " join chats_users cu on c.id = cu.chats_id" +
      " where c.type = :type and cu.users_id = :authUserId) a " +
      " where id in (select c.id from chats c " +
      " join chats_users cu on c.id = cu.chats_id " +
      " where c.type = :type and cu.users_id = :guestUserId)"
    , nativeQuery = true)
  Optional<Chat> findPrivateChatByUsersIds(String type, Long authUserId, Long guestUserId);
}

/*
select * from (select * from chats c
       join chats_users cu on c.id = cu.chats_id
       where c.type = 'PRIVATE' and cu.users_id = 1) a
       where id in (select c.id from chats c
       join chats_users cu on c.id = cu.chats_id
       where c.type =  'PRIVATE'  and cu.users_id = 4);

select c.id, u.id, m.text, m.created_at
from chats c
         left join messages m on c.id = m.chat_id
         join chats_users cu on c.id = cu.chats_id
         join users u on u.id = cu.users_id

where m.user_id = 1
   or m.text is null

group by c.id, m.text, c.id, m.created_at, u.id
order by m.created_at desc;


select c.id, MAX(m.created_at) as last_message

--      , c.type, c.title, c.uuid, u.id, u.uuid,  u.avatar_img_url, m.id
--        m.uuid, m.text, m.created_at
from chats c
left join messages m on c.id = m.chat_id

group by c.id

-- order by m.created_at desc


select c.id, c.uuid, c.title, c.type,

       c.created_at, c.created_by, c.updated_at, c.updated_by,

       MAX(m.created_at) over () as mmm

from chats c

left join messages m on c.id = m.chat_id

group by c.id

order by mmm desc NULLS LAST;


select *

--        MAX(m.created_at) as max, m.id

from chats c

         left join (select MAX(m.created_at) as mmm, m.chat_id from messages m group by  m.chat_id) as m
                   on m.chat_id = c.id

group by c.id, mmm, m.chat_id

order by mmm desc NULLS LAST

select c.id,
       c.uuid,
       c.title,
       c.type,

       c.created_at,
       c.created_by,
       c.updated_at,
       c.updated_by

from chats c

         left join messages m on c.id = m.chat_id
         join chats_users cu on c.id = cu.chats_id
         join users u on u.id = cu.users_id

where u.id = 2

group by c.id


order by MAX(m.created_at) desc NULLS LAST;


 */
