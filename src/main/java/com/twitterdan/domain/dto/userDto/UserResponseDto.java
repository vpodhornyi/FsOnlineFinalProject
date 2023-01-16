package com.twitterdan.domain.dto.userDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.twitterdan.utils.DateSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private Long id;

    private String name;

    private String userTag;

    // нужно ли нам отдавать фронту пароль и имейл?
    private String email;
    private String password;

    @JsonSerialize(using = DateSerializer.class)
    private Date birthDate;

    private String bio;

    private String location;

    private String avatarImgUrl;

    private String headerImgUrl;

    @JsonProperty("followers")
    private Set<String> followersIds = new HashSet<>();

    @JsonProperty("followings")
    private Set<String> followingsIds = new HashSet<>();

    @JsonProperty("tweets")
    private Set<Long> tweetsIds = new HashSet<>();

    @Override
    public String toString() {
        return "UserResponseDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", userTag='" + userTag + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", birthDate=" + birthDate +
                ", bio='" + bio + '\'' +
                ", location='" + location + '\'' +
                ", avatarImgUrl='" + avatarImgUrl + '\'' +
                ", headerImgUrl='" + headerImgUrl + '\'' +
                ", followersIds=" + followersIds +
                ", followingsIds=" + followingsIds +
                ", tweetsIds=" + tweetsIds +
                '}';
    }
}
