package com.twitter.danit.domain.chat;

import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "chats")
@Getter
@Setter
@NoArgsConstructor
public class Chat extends BaseEntity {

  private String title;

  @ManyToMany
  private Set<User> users;
}
