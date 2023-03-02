package com.twitterdan.dao;

import com.twitterdan.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  Optional<User> findByUserTag(String userTag);

  @Query("select u from User u where u.name like %:text% or u.userTag like %:text%")
  Optional<List<User>> findTop10ByMatchingNameOrUserTag(@Param("text") String text);

  @Query(value = "SELECT * FROM users WHERE id !=:userId AND id NOT IN " +
          "(SELECT FOLLOWED_ID FROM FOLLOWERS WHERE FOLLOWER_ID =:userId)",
            nativeQuery = true)
  Optional<Page<User>> findAllNotFollowingUsers(Long userId, Pageable pageable);
}
