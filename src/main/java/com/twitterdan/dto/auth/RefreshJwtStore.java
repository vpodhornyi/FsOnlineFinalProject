package com.twitterdan.dto.auth;

import com.twitterdan.domain.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.RequiredArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "refresh_jwt_store")
@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
public class RefreshJwtStore extends BaseEntity {

  @Column(nullable = false)
  private String login;
  @Column(nullable = false)
  private String refreshToken;
}
