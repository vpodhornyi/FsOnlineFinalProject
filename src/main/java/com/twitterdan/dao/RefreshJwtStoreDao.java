package com.twitterdan.dao;

import com.twitterdan.dto.auth.RefreshJwtStore;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RefreshJwtStoreDao extends CrudRepository<RefreshJwtStore, Integer> {
  Optional<RefreshJwtStore> findFirstByLoginOrderByIdDesc(String login);

  void deleteAllByLogin(String login);
}
