package com.twitterdan.controller;

import com.twitterdan.domain.auth.AccountCheckResponse;
import com.twitterdan.domain.auth.AccountCheckRequest;
import com.twitterdan.domain.auth.JwtResponse;
import com.twitterdan.domain.auth.JwtRequest;
import com.twitterdan.domain.auth.RefreshJwtRequest;
import com.twitterdan.dto.signup.SignUpRequest;
import com.twitterdan.service.auth.JwtAuthService;
import com.twitterdan.service.auth.SignUpService;

import lombok.RequiredArgsConstructor;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;


@RestController
@RequestMapping("${api.version}/auth")
@Validated
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
  private final JwtAuthService jwtAuthService;
  private final SignUpService signUpService;

  @Autowired
  PasswordEncoder passwordEncoder;

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

  @PostMapping("/signup")
  public ResponseEntity<HttpStatus> signup(@RequestBody SignUpRequest signUpRequest) {
    this.signUpService.signup(signUpRequest);
    return ResponseEntity.ok().build();
  }
}

