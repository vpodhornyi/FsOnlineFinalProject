package com.twitterdan.service.auth;

import com.twitterdan.dao.RefreshJwtStoreDao;
import com.twitterdan.domain.auth.AccountCheckResponse;
import com.twitterdan.domain.auth.AccountCheckRequest;
import com.twitterdan.domain.auth.JwtResponse;
import com.twitterdan.domain.auth.JwtRequest;
import com.twitterdan.domain.auth.RefreshJwtStore;
import com.twitterdan.domain.auth.JwtAuthentication;
import com.twitterdan.domain.user.User;
import com.twitterdan.exception.WrongPasswordException;
import com.twitterdan.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class JwtAuthService implements AuthService {

  public final UserService userService;
  private final RefreshJwtStoreDao refreshJwtStoreDao;
  private final JwtProvider jwtProvider;

  @Override
  public AccountCheckResponse account(@NonNull AccountCheckRequest req) {
    try {
      userService.getByUserTag(req.getLogin());
    } catch (Exception e) {
      userService.getByEmail(req.getLogin());
    }
    return new AccountCheckResponse(req.getLogin());
  }

  @Override
  public JwtResponse login(@NonNull JwtRequest req) {
    User user;

    try {
      user = userService.getByUserTag(req.getLogin());
    } catch (Exception e) {
      user = userService.getByEmail(req.getLogin());
    }

    if (user.getPassword().equals(req.getPassword())) {
      final String newAccessToken = jwtProvider.generateAccessToken(user);
      final String newRefreshToken = jwtProvider.generateRefreshToken(user);
      refreshJwtStoreDao.save(new RefreshJwtStore(user.getUserTag(), newRefreshToken));

      return new JwtResponse(newAccessToken, newRefreshToken);
    }
    throw new WrongPasswordException();
  }

  @Override
  public JwtResponse getAccessToken(@NonNull String refreshToken) {
    if (jwtProvider.validateRefreshToken(refreshToken)) {
      final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
      final String login = claims.getSubject();
      Optional<RefreshJwtStore> refreshJwtStoreOptional = refreshJwtStoreDao.findFirstByLoginOrderByIdDesc(login);

      if (refreshJwtStoreOptional.isPresent()) {
        String saveRefreshToken = refreshJwtStoreOptional.get().getRefreshToken();

        if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
          final User user = userService.getByUserTag(login);
          final String accessToken = jwtProvider.generateAccessToken(user);

          return new JwtResponse(accessToken, null);
        }
      }
    }
    return new JwtResponse(null, null);
  }

  @Override
  public JwtResponse refresh(@NonNull String refreshToken) {
    if (jwtProvider.validateRefreshToken(refreshToken)) {
      final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
      final String login = claims.getSubject();
      Optional<RefreshJwtStore> refreshJwtStoreOptional = refreshJwtStoreDao.findFirstByLoginOrderByIdDesc(login);

      if (refreshJwtStoreOptional.isPresent()) {
        String saveRefreshToken = refreshJwtStoreOptional.get().getRefreshToken();

        if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
          User user = userService.getByUserTag(login);
          final String newAccessToken = jwtProvider.generateAccessToken(user);
          final String newRefreshToken = jwtProvider.generateRefreshToken(user);
          RefreshJwtStore refreshJwtStore = new RefreshJwtStore(user.getUserTag(), newRefreshToken);
          refreshJwtStore.setCreatedBy(user.getEmail());
          refreshJwtStore.setUpdatedBy(user.getEmail());
          refreshJwtStoreDao.save(refreshJwtStore);

          return new JwtResponse(newAccessToken, newRefreshToken);
        }
      }
    }
    throw new RuntimeException();
  }

  @Override
  public JwtAuthentication getAuthInfo() {
    return (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
  }

  @Override
  public void deleteAllByLogin(String login) {
    refreshJwtStoreDao.deleteAllByLogin(login);
  }
}
