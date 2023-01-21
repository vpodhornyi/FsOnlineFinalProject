package com.twitterdan.domain.chat;

import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "chats_deleted")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ChatDeleted extends BaseEntity {

  public ChatDeleted(Chat chat, User user) {
    this.setCreatedBy(user.getEmail());
    this.setUpdatedBy(user.getEmail());
    this.chat = chat;
    this.user = user;
  }

  @ManyToOne
  @JoinColumn(name = "chat_id")
  private Chat chat;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
