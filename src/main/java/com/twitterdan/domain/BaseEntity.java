package com.twitterdan.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;
import javax.persistence.MappedSuperclass;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import java.io.Serializable;

@MappedSuperclass
@Getter
@NoArgsConstructor
public abstract class BaseEntity extends Auditable<String> implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, nullable = false, updatable = false)
  private Long id;

  @Column(name = "uuid", unique = true, nullable = false, updatable = false)
  private String key = UUID.randomUUID().toString();
}
