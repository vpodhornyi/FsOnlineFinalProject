package com.twitter.danit.domain.attachment;

import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.tweet.Tweet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "attachment_images")
@Getter
@Setter
@NoArgsConstructor
public class AttachmentImage extends BaseEntity {

  private String imgUrl;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;
}
