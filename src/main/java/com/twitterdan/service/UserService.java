package com.twitterdan.service;

import com.twitterdan.dao.UserJpaDao;
import com.twitterdan.domain.user.User;
import com.twitterdan.exception.CouldNotFindAccountException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements BaseService<User> {

  private final UserJpaDao userJpaDao;

  @Override
  public List<User> findAll() {
    return null;
  }

  @Override
  public List<User> getAllPageable(int size, int pageNumber) {
    return null;
  }

  @Override
  public User getById(Long userId) {
    Optional<User> optionalUser = userJpaDao.findById(userId);

    if (optionalUser.isPresent()) return optionalUser.get();

    throw new CouldNotFindAccountException();
  }

  public User getByEmail(String email) {
    Optional<User> optionalUser = userJpaDao.findByEmail(email);

    if (optionalUser.isPresent()) return optionalUser.get();

    throw new CouldNotFindAccountException();
  }

  public User getByUserTag(String userTag) {
    Optional<User> optionalUser = userJpaDao.findByUserTag(userTag);

    if (optionalUser.isPresent()) return optionalUser.get();

    throw new CouldNotFindAccountException();
  }

  @Override
  public void update(User obj) {

  }

  @Override
  public void create(User obj) {
    userJpaDao.save(obj);
  }

  @Override
  public void delete(Integer id) {

  }
}
