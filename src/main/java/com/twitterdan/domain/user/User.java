package com.twitterdan.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.tweet.Tweet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;


@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity {

  private String name;
  private String userTag;
  private String email;
  private String password;
  private Date birthDate;
  private String bio;
  private String location;
  private String avatarImgUrl;
  private String headerImgUrl;

  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Set<Tweet> tweets;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany
  @JoinTable(name = "followers",
    joinColumns = @JoinColumn(name = "followed_id"),
    inverseJoinColumns = @JoinColumn(name = "follower_id"))
  @JsonIgnore
  private Set<User> followers;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany
  @JoinTable(name = "followers",
    joinColumns = @JoinColumn(name = "follower_id"),
    inverseJoinColumns = @JoinColumn(name = "followed_id"))
  @JsonIgnore
  private Set<User> followings;

  @ManyToMany
  private Set<Chat> chats;


}
