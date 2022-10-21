package com.twitter.danit.model.chat;

import com.twitter.danit.model.BaseEntity;
import com.twitter.danit.model.user.User;
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
