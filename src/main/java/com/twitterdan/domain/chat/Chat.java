package com.twitterdan.domain.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "chats")
@Getter
@Setter
@NoArgsConstructor
public class Chat extends BaseEntity {

  private String title;

  @Enumerated(EnumType.STRING)
  private ChatType type;
  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany(mappedBy = "chats")
  private Set<User> users;

  @OneToMany(mappedBy = "chat")
  @JsonIgnore
  private Set<Message> messages;

  @Override
  public String toString() {
    return "Chat{" +
      "title='" + title + '\'' +
      '}';
  }
}
