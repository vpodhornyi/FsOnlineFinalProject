package com.twitterdan.utils.auth;


import com.twitterdan.dto.auth.JwtAuthentication;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class JwtUtils {

  public static JwtAuthentication generate(Claims claims, String login) {
    final JwtAuthentication jwtInfoToken = new JwtAuthentication();
    jwtInfoToken.setUserTag(claims.get(login, String.class));
    return jwtInfoToken;
  }
}
