package com.twitterdan.dto.user;

import com.twitterdan.domain.user.BackgroundColor;
import com.twitterdan.domain.user.Color;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomStyleResponse {
  private Color color;
  private BackgroundColor backgroundColor;
  private Integer fontSize;
}
