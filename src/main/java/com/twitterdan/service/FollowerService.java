package com.twitterdan.service;

import com.twitterdan.dao.FollowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowerService {
  private final FollowerRepository followerRepository;

  
}
