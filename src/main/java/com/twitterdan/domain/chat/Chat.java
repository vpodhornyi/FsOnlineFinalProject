package com.twitterdan.domain.chat;

import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "chats")
@Getter
@Setter
@NoArgsConstructor
public class Chat extends BaseEntity {

  private String title;

  @ManyToMany(mappedBy = "chats")
  private Set<User> users;

  @OneToMany(mappedBy = "chat")
  private Set<Message> messages;
}
