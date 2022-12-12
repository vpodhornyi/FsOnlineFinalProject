package com.twitterdan.domain.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

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
  @ManyToMany(cascade = {CascadeType.ALL})
  @JoinTable(name = "chats_users",
    joinColumns = @JoinColumn(name = "chats_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "users_id", referencedColumnName = "id"))
  @ToString.Exclude
  private List<User> users;

  @OneToMany(mappedBy = "chat")
  @ToString.Exclude
  private transient List<Message> messages;

  @Transient
  private Message lastMessage;
}
