package com.twitterdan.domain.chat;

import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "messages_seen")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class MessageSeen extends BaseEntity {

  public MessageSeen(Message message, User user) {
    this.setCreatedBy(user.getEmail());
    this.setUpdatedBy(user.getEmail());
    this.message = message;
    this.user = user;
  }

  @ManyToOne
  @JoinColumn(name = "message_id")
  private Message message;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
