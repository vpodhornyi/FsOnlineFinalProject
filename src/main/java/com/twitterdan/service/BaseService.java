package com.twitterdan.service;

import java.util.List;

public interface BaseService<T> {
  List<T> findAll();

  List<T> getAllPageable(int size, int pageNumber);

  T getById(Long userId);

  void update(T obj);

  void create(T obj);

  void delete(Integer id);
}
