package com.twitterdan.domain.dto.userdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileUpdateRequestDto {
  @Min(3)
  @Max(50)
  private String name;

  @Min(5)
  @Max(160)
  private String bio;

  @Min(2)
  @Max(30)
  private String location;

  private String headerImgUrl;

  private String avatarImgUrl;

  private String birth;

  @Override
  public String toString() {
    return "UserProfileUpdateRequestDto{" + "name='" + name + '\''
            + ", bio='" + bio + '\'' + ", location='" + location + '\'' + ", headerImgUrl='" + headerImgUrl + '\''
            + ", avatarImgUrl='" + avatarImgUrl + '\'' + ", birth='" + birth + '\'' + '}';
  }
}
