package com.twitterdan.dto.cloudinary;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CloudinaryImageRequest {
  private MultipartFile uploadFile;
}
