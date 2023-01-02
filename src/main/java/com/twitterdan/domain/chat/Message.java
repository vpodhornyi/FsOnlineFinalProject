package com.twitterdan.domain.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message extends BaseEntity {

  public Message(String text, Chat chat, User user) {
    String email = user.getEmail();
    this.setCreatedBy(email);
    this.setUpdatedBy(email);
    this.text = text;
    this.chat = chat;
    this.user = user;
  }

  private String text;
  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "message")
  private List<MessageSeen> seen = new ArrayList<>();

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "message")
  private List<MessageDeleted> deleted = new ArrayList<>();

  public void addSeen(MessageSeen messageSeen) {
    seen.add(messageSeen);
  }
  public void addDeleted(MessageDeleted messageDeleted) {
    deleted.add(messageDeleted);
  }

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "chat_id")
  private Chat chat;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  public Optional<List<MessageSeen>> getSeen() {
    return Optional.ofNullable(seen);
  }
}
