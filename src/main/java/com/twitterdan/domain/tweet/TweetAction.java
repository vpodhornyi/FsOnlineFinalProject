package com.twitterdan.domain.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tweet_actions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TweetAction extends BaseEntity {

  @Enumerated(EnumType.STRING)
  private ActionType actionType;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  @ManyToOne
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private User user;

  @Override
  public String toString() {
    return "TweetAction{" +
            "actionType=" + actionType +
            ", user=" + user +
            '}';
  }
}
