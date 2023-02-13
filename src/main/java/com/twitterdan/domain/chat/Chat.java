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
import java.util.Optional;

@Entity
@Table(name = "chats")
@Getter
@Setter
@NoArgsConstructor
public class Chat extends BaseEntity {
  private String title;
  private String avatarImgUrl;
  @Enumerated(EnumType.STRING)
  private ChatType type;
  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
  @JoinTable(name = "chats_users", joinColumns = @JoinColumn(name = "chats_id", referencedColumnName = "id"),
          inverseJoinColumns = @JoinColumn(name = "users_id", referencedColumnName = "id"))
  private List<User> users = new ArrayList<>();

  @OneToMany(mappedBy = "chat")
  @ToString.Exclude
  private transient List<Message> messages = new ArrayList<>();

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "chat")
  private List<ChatDeleted> deleted = new ArrayList<>();

  public void setDeleted(List<ChatDeleted> deleted) {
    this.deleted = deleted;
  }

  public void addDeleted(User user) {
    deleted.add(new ChatDeleted(this, user));
  }

  public void addUsers(List<User> users) {
    users.forEach(u -> {
      Optional<User> optionalUser = this.users.stream().filter(user -> user.equals(u)).findFirst();
      if (optionalUser.isEmpty()) {
        this.users.add(u);
      }
    });
  }

  @Override
  public String toString() {
    return "Chat{" + "title='" + title + '\'' + ", type=" + type + ", users=" + users + '}';
  }
}
