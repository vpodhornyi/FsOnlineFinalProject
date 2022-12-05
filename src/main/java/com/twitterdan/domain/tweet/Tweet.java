package com.twitterdan.domain.tweet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.attachment.AttachmentImage;
import com.twitterdan.domain.notification.Notification;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tweets")
@Getter
@Setter
@NoArgsConstructor
public class Tweet extends BaseEntity {

  @Enumerated(EnumType.STRING)
  private TweetType tweetType;

  private String body;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToOne
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private User user;

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<AttachmentImage> images=new HashSet<>();

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Notification> notifications=new HashSet<>();

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<TweetAction> actions=new HashSet<>();

}
