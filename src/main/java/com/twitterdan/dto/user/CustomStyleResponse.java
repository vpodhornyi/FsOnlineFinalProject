package com.twitterdan.dto.user;

import com.twitterdan.domain.user.BackgroundColor;
import com.twitterdan.domain.user.Color;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomStyleResponse {
	private Color color;
	private BackgroundColor backgroundColor;
	private Integer fontSize;
}
