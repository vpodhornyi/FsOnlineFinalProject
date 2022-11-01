package com.twitterdan.dao;

import com.twitterdan.domain.user.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserJpaDao extends CrudRepository<User, Integer>, JpaSpecificationExecutor<User> {
  Optional<User> findById(Long id);
  Optional<User> findByEmail(String email);
  Optional<User> findByUserTag(String userTag);
}
