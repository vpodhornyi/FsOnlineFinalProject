package com.twitter.danit.domain.tweet;

import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "tweet_actions")
@Getter
@Setter
@NoArgsConstructor
public class TweetAction extends BaseEntity {

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ActionType actionType;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  @ManyToOne
  private User user;
}
