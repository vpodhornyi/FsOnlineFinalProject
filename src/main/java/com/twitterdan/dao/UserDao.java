package com.twitterdan.dao;

import com.twitterdan.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
  User findByUserTag(String userTag);

  User findByEmail(String email);
}