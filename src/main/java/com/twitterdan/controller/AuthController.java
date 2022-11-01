package com.twitterdan.controller;

import com.twitterdan.domain.auth.*;
import com.twitterdan.service.auth.JwtAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("${api.version}/auth")
@Validated
@RequiredArgsConstructor
public class AuthController {
  private final JwtAuthService jwtAuthService;

  @PostMapping("/account")
  public ResponseEntity<AccountCheckResponse> account(@Valid @RequestBody AccountCheckRequest authRequest) {
    final AccountCheckResponse res = jwtAuthService.account(authRequest);

    return ResponseEntity.ok(res);
  }

  @PostMapping("/login")
  public ResponseEntity<JwtResponse> getAccessRefreshTokens(@Valid @RequestBody JwtRequest authRequest) {
    final JwtResponse res = jwtAuthService.login(authRequest);

    return ResponseEntity.ok(res);
  }

  @GetMapping("/logout")
  public void logout() {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    jwtAuthService.deleteAllByLogin(userTag);
  }

  @PostMapping("/access")
  public ResponseEntity<JwtResponse> getNewAccessToken(@RequestBody RefreshJwtRequest request) {
    final JwtResponse jwtResponse = jwtAuthService.getAccessToken(request.getRefreshToken());
    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping("/refresh")
  public ResponseEntity<JwtResponse> getNewRefreshToken(@RequestBody RefreshJwtRequest request) {
    final JwtResponse jwtResponse = jwtAuthService.refresh(request.getRefreshToken());
    return ResponseEntity.ok(jwtResponse);
  }
}

