package com.twitterdan.config;

import com.twitterdan.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configurable
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
  private final JwtFilter jwtFilter;
  private final String ping;
  private final String account;
  private final String login;
  private final String token;

  public SecurityConfig(JwtFilter jwtFilter,
                        @Value("/ping") String ping,
                        @Value("${api.version}/auth/account") String account,
                        @Value("${api.version}/auth/authorize") String login,
                        @Value("${api.version}/auth/access") String token) {
    this.jwtFilter = jwtFilter;
    this.ping = ping;
    this.account = account;
    this.login = login;
    this.token = token;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
      .httpBasic().disable()
      .csrf().disable()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeHttpRequests(
        auth -> auth
          .antMatchers(ping, account, login, token).permitAll()
          .anyRequest().authenticated()
          .and()
          .addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class)
      ).build();
  }
}
