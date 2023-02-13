package com.twitterdan.domain.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.attachment.AttachmentImage;
import com.twitterdan.domain.notification.Notification;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
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

  private Long parentTweetId;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToOne
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private User user;

  @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL)
  private Set<AttachmentImage> images = new HashSet<>();

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Notification> notifications = new HashSet<>();

  @OneToMany(mappedBy = "tweet")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<TweetAction> actions = new HashSet<>();
  @ManyToOne
  @JoinColumn(name = "retweet_id")
  private User retweetUser;



  @Override
  public String toString() {
    return "Tweet{" +
            "tweetType=" + tweetType +
            ", body='" + body + '\'' +
            ", user=" + user +
            ", images=" + images +
            ", notifications=" + notifications +
            ", actions=" + actions +
            ", parentTweetId=" + parentTweetId +
            ", retweetId=" + retweetUser +
            '}';
  }
}
