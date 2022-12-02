package com.twitterdan.domain.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
public class Message extends BaseEntity {

  private String text;

  @ManyToOne
  @JoinColumn(name = "chat_id")
  @JsonIgnore
  private Chat chat;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

}
