package com.twitterdan.dto.user;

import com.twitterdan.domain.user.BackgroundColor;
import com.twitterdan.domain.user.Color;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomStyleRequest {
  private Long userId;
  private Color color;
  private BackgroundColor backgroundColor;
  private Integer fontSize;
}
