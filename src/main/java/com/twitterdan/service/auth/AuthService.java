package com.twitterdan.service.auth;

import com.twitterdan.dto.auth.AccountCheckResponse;

import com.twitterdan.dto.auth.AccountCheckRequest;
import com.twitterdan.dto.auth.JwtResponse;
import com.twitterdan.dto.auth.JwtRequest;
import com.twitterdan.dto.auth.JwtAuthentication;
import lombok.NonNull;

public interface AuthService {
  
  public AccountCheckResponse account(@NonNull AccountCheckRequest req);

  public JwtResponse login(@NonNull JwtRequest req);

  public JwtResponse getAccessToken(@NonNull String refreshToken);

  public JwtResponse refresh(@NonNull String refreshToken);

  public JwtAuthentication getAuthInfo();

  void deleteAllByLogin(String login);

}
