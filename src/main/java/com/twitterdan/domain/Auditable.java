package com.twitterdan.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable<T> {
  @CreatedBy
  @Column(name = "created_by", updatable = false, nullable = false)
  private T createdBy;

  @CreatedDate
  @Column(name = "created_at", updatable = false, nullable = false)
  private Date createdAt;

  @LastModifiedBy
  @Column(name = "updated_by", updatable = false, nullable = false)
  private T updatedBy;

  @LastModifiedDate
  @Column(name = "updated_at", updatable = false, nullable = false)
  private Date updatedAt;
}
