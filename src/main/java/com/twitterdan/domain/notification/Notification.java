package com.twitterdan.domain.notification;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain=true)
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
  @JsonIgnore
  private Tweet tweet;

  private boolean isRead;

  @Override
  public String toString() {
    return "Notification{" +
            "notificationType=" + notificationType +
            ", userReceiver=" + userReceiver.getUserTag() +
            ", userInitiator=" + userInitiator.getUserTag() +
            ", isRead=" + isRead +
            '}';
  }
}
