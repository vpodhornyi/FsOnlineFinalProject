package com.twitterdan.domain.chat;

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
@NoArgsConstructor
public class Chat extends BaseEntity {
  private String title;
  @Enumerated(EnumType.STRING)
  private ChatType type;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
  @JoinTable(name = "chats_users",
    joinColumns = @JoinColumn(name = "chats_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "users_id", referencedColumnName = "id"))
  private List<User> users;

  @OneToMany(mappedBy = "chat")
  @ToString.Exclude
  private transient List<Message> messages;

  @Transient
  private Message lastMessage;

  @Override
  public String toString() {
    return "Chat{" +
      "title='" + title + '\'' +
      ", type=" + type +
      ", users=" + users +
      ", lastMessage=" + lastMessage +
      '}';
  }
}
