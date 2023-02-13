package com.twitterdan.config;

import com.twitterdan.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configurable
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
  private final JwtFilter jwtFilter;
  private final String ws;
  private final String account;
  private final String login;
  private final String token;
  private final String signup;

  public SecurityConfig(
          JwtFilter jwtFilter, @Value("/ws") String ws, @Value("${api.version}/auth/account") String account,
          @Value("${api.version}/auth/login") String login, @Value("${api.version}/auth/signup") String signup,
          @Value("${api.version}/auth/access") String token) {
    this.ws = ws;
    this.jwtFilter = jwtFilter;
    this.account = account;
    this.login = login;
    this.token = token;
    this.signup = signup;
  }

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.ignoring().antMatchers("/h2-console/**");
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http.httpBasic().disable().csrf().disable().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(auth ->
                    auth.antMatchers(ws, account, login, token, signup).permitAll().anyRequest().authenticated()
                            .and().addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class)).build();
  }

  @Bean
  public BCryptPasswordEncoder getPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
