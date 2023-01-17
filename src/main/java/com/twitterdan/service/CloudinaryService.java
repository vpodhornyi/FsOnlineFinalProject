package com.twitterdan.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.twitterdan.exception.CouldNotGetImagesException;
import com.twitterdan.exception.CouldNotUploadImageException;
import org.cloudinary.json.JSONArray;
import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

@Service
public class CloudinaryService {
  private final Cloudinary cloud;

  public CloudinaryService(@Value("${cloudinary.cloud_name}") String cloudName,
                           @Value("${cloudinary.api_key}") String apiKey,
                           @Value("${cloudinary.api_secret}") String apiSecret) {
    cloud = new Cloudinary("cloudinary://" + apiKey + ":" + apiSecret + "@" + cloudName);
  }

  public List<String> getImages(String name) {
    try {
      List<String> images = new ArrayList<>();
      JSONObject json = new JSONObject(cloud.api().resource("", ObjectUtils.asMap("type", "upload")));
      JSONArray ja = json.getJSONArray("resources");
      for (int i = 0; i < ja.length(); i++) {
        JSONObject j = ja.getJSONObject(i);
        images.add(j.getString("url"));
      }

      return images;

    } catch (Exception e) {
      throw new CouldNotGetImagesException();
    }
  }

  public String uploadImage(MultipartFile uploadFile) {
    try {
      File file = Files.createTempFile("temp", uploadFile.getOriginalFilename()).toFile();
      uploadFile.transferTo(file);
      JSONObject json = new JSONObject(cloud.uploader().upload(file, ObjectUtils.emptyMap()));

      return json.getString("url");

    } catch (IOException e) {
      throw new CouldNotUploadImageException();
    }
  }
}
