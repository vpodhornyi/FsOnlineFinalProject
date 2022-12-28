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
@AllArgsConstructor
@ToString
public class MessageSeen extends BaseEntity {
  @ManyToOne
  @JoinColumn(name = "message_id")
  private Message message;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
