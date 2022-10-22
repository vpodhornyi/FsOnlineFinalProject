package com.twitter.danit.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.tweet.Tweet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.OneToMany;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
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

  @OneToMany
  @JoinColumn(name = "user_id")
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
