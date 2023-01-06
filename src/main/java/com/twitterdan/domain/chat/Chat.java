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
import java.util.ArrayList;
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

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "chat")
  private List<ChatDeleted> deleted = new ArrayList<>();

  public void setDeleted(List<ChatDeleted> deleted) {
    this.deleted = deleted;
  }

  public void addDeleted(User user) {
    deleted.add(new ChatDeleted(this, user));
  }

  @Override
  public String toString() {
    return "Chat{" +
      "title='" + title + '\'' +
      ", type=" + type +
      ", users=" + users +
      '}';
  }
}
