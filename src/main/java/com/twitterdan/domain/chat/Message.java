package com.twitterdan.domain.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message extends BaseEntity {

  private String text;

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "message")
  private List<MessageSeen> seen;

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
