package com.twitterdan.dto.user;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class UserRequest {
  private String name;
  private String userTag;
  private String email;
  private String password;
  private LocalDate birthDate;
  private String bio;
  private String location;
  private String avatarImgUrl;
  private String headerImgUrl;
}
