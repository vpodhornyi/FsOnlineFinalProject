package com.twitterdan.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitterdan.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "custom_style")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomStyle extends BaseEntity {

  @Enumerated(EnumType.STRING)
  private BackgroundColor backgroundColor;

  @Enumerated(EnumType.STRING)
  private Color color;

  private Integer fontSize;

  @OneToOne()
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User user;
}
