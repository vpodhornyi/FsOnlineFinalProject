package com.twitterdan.domain.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chats")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Chat extends BaseEntity {

  private String title;

  @Enumerated(EnumType.STRING)
  private ChatType type;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany(mappedBy = "chats", cascade = CascadeType.PERSIST)
  @ToString.Exclude
  private List<User> users = new ArrayList<>();

  @OneToMany(mappedBy = "chat")
  @JsonIgnore
  @ToString.Exclude
  private List<Message> messages;
}
