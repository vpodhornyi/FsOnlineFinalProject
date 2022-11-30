package com.twitterdan.domain.attachment;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitterdan.domain.BaseEntity;
import com.twitterdan.domain.tweet.Tweet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "attachment_images")
@Getter
@Setter
@NoArgsConstructor
public class AttachmentImage extends BaseEntity {

  private String imgUrl;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Tweet tweet;
}

