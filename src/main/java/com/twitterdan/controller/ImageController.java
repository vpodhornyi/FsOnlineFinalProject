package com.twitterdan.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.twitterdan.config.UploadTypes;
import com.twitterdan.service.UserService;
import org.cloudinary.json.JSONArray;
import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/cloud")
public class ImageController {

    @Autowired
    private UserService userService;

    @Autowired
    @Qualifier("com.cloudinary.cloud_name")
    String cloudName;

    @Autowired
    @Qualifier("com.cloudinary.api_key")
    String apiKey;

    @Autowired
    @Qualifier("com.cloudinary.api_secret")
    String apiSecret;

    @GetMapping(value = "/images")
    public ResponseEntity<List<String>> get(
            @RequestParam(value = "name", required = false) String name) {
        Cloudinary cloud = new Cloudinary("cloudinary://" + apiKey + ":" + apiSecret + "@" + cloudName);
        List<String> images = new ArrayList<>();
        try {
            Map response = cloud.api().resource("", ObjectUtils.asMap("type", "upload"));
            JSONObject json = new JSONObject(response);
            JSONArray ja = json.getJSONArray("resources");
            for (int i = 0; i < ja.length(); i++) {
                JSONObject j = ja.getJSONObject(i);
                images.add(j.getString("url"));
            }

            return new ResponseEntity<>(images, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/image")
    public ResponseEntity<String> post(
            @RequestParam(value = "upload") MultipartFile uploadFile,
            @RequestParam(value = "userId") String id,
            @RequestParam(value = "uploadType") UploadTypes uploadType) {
        Cloudinary cloud = new Cloudinary("cloudinary://" + apiKey + ":" + apiSecret + "@" + cloudName);

        try {
            File file = Files.createTempFile("temp", uploadFile.getOriginalFilename()).toFile();
            uploadFile.transferTo(file);
            Map response = cloud.uploader().upload(file, ObjectUtils.emptyMap());
            JSONObject json = new JSONObject(response);
            String url = json.getString("url");

            switch (uploadType) {
                case UPDATE_PROFILE_AVATAR -> userService.updateUserAvatar(Long.valueOf(id), url);

                case UPDATE_PROFILE_HEADER -> userService.updateUserHeader(Long.valueOf(id), url);

                case TWEET -> System.out.println("TWEET CASE");
            }

            return new ResponseEntity<>("{\"status\":\"OK\", \"url\":\"" + url + "\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
        }
    }
}
