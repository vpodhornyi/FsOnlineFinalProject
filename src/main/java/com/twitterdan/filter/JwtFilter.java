package com.twitterdan.filter;

import com.twitterdan.dto.auth.JwtAuthentication;
import com.twitterdan.service.auth.JwtProvider;
import com.twitterdan.utils.auth.JwtUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

  private static final String AUTHORIZATION = "Authorization";
  @Value("${jwt.authorization.user.field}")
  private String userLoginField;
  private final JwtProvider jwtProvider;

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain ch)
    throws IOException, ServletException {

    final String token = getTokenFromRequest((HttpServletRequest) req);

    if (token != null && jwtProvider.validateAccessToken(token)) {
      final Claims claims = jwtProvider.getAccessClaims(token);
      final JwtAuthentication jwtInfoToken = JwtUtils.generate(claims, userLoginField);
      jwtInfoToken.setAuthenticated(true);
      log.info(token);
      log.info(jwtInfoToken.toString());
      SecurityContextHolder.getContext().setAuthentication(jwtInfoToken);
    }

    ch.doFilter(req, res);
  }

  private String getTokenFromRequest(HttpServletRequest req) {
    final String bearer = req.getHeader(AUTHORIZATION);

    if (StringUtils.hasText(bearer) && bearer.startsWith("Bearer ")) {
      return bearer.substring(7);
    }

    return null;
  }
}
