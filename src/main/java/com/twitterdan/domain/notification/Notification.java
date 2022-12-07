package com.twitterdan.domain.notification;

import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
public class Notification extends BaseEntity {

  @Enumerated(EnumType.STRING)
  private NotificationType notificationType;

  @ManyToOne
  @JoinColumn(name = "receiver_id")
  private User userReceiver;

  @ManyToOne
  @JoinColumn(name = "initiator_id")
  private User userInitiator;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  private boolean isRead;
}
