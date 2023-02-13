package com.twitterdan.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.chat.Chat;
import com.twitterdan.domain.tweet.Tweet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity {

  private String name;

  @Column(unique = true, nullable = false)
  private String userTag;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;
  private LocalDate birthDate;
  private String bio;
  private String location;
  private String avatarImgUrl;
  private String headerImgUrl;
  @LazyCollection(LazyCollectionOption.EXTRA)
  @OneToMany
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private Set<Tweet> tweets;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany
  @JoinTable(name = "followers", joinColumns = @JoinColumn(name = "followed_id"),
          inverseJoinColumns = @JoinColumn(name = "follower_id"))
  @JsonIgnore
  private Set<User> followers;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany
  @JoinTable(name = "followers", joinColumns = @JoinColumn(name = "follower_id"),
          inverseJoinColumns = @JoinColumn(name = "followed_id"))
  @JsonIgnore
  private Set<User> followings;
  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
  @JsonIgnore
  private transient Set<Chat> chats;

  @OneToOne(cascade = CascadeType.MERGE)
  private CustomStyle customStyle;

  @Override
  public String toString() {
    return "User{" + "userTag='" + userTag + '\'' + '}';
  }

  @Override
  public boolean equals(Object obj) {
    User user = new User();
    if (this == obj) {
      return true;
    }
    if (! (obj instanceof User)) {
      return false;
    }
    return (Objects.equals(userTag, user.userTag) && Objects.equals(email, user.email));
  }

  @Override
  public int hashCode() {
    return Objects.hash(userTag, email);
  }
}
