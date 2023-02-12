package com.twitterdan.domain.attachment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.tweet.Tweet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "attachment_images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class AttachmentImage extends BaseEntity {

  private String imgUrl;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  @JsonIgnore
  private Tweet tweet;
}

