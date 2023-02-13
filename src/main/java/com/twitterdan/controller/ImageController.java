package com.twitterdan.controller;

import com.twitterdan.config.UploadTypes;
import com.twitterdan.dto.cloudinary.CloudinaryImageResponse;
import com.twitterdan.service.CloudinaryService;
import com.twitterdan.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "${api.version}/cloud")
public class ImageController {
  private final UserService userService;
  private final CloudinaryService cloudinaryService;

  public ImageController(UserService userService, CloudinaryService cloudinaryService) {
    this.userService = userService;
    this.cloudinaryService = cloudinaryService;
  }

  @GetMapping(value = "/images")
  public ResponseEntity<List<String>> get(
          @RequestParam(value = "name", required = false) String name) {
    return ResponseEntity.ok(cloudinaryService.getImages(name));
  }

  @PostMapping(value = "/image")
  public ResponseEntity<String> post(
          @RequestParam(value = "upload") MultipartFile uploadFile, @RequestParam(value = "entityId") String id,
          @RequestParam(value = "uploadType") UploadTypes uploadType) {

    String url = cloudinaryService.uploadImage(uploadFile);

    switch (uploadType) {
      case UPDATE_PROFILE_AVATAR:
        userService.updateUserAvatar(Long.valueOf(id), url);
        break;
      case UPDATE_PROFILE_HEADER:
        userService.updateUserHeader(Long.valueOf(id), url);
        break;
      default:
        System.out.println("No, search case");
    }

    return new ResponseEntity<>("{\"status\":\"OK\", \"url\":\"" + url + "\"}", HttpStatus.OK);
  }

  @PostMapping(value = "/images")
  public ResponseEntity<CloudinaryImageResponse> saveImage(@RequestParam MultipartFile uploadFile) {
    String url = cloudinaryService.uploadImage(uploadFile);

    return ResponseEntity.ok(new CloudinaryImageResponse(url));
  }
}