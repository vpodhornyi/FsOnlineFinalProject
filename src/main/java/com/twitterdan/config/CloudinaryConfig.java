package com.twitterdan.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.yml")
public class CloudinaryConfig {

  @Value("${cloudinary.cloud_name}")
  private String cloudName;

  @Value("${cloudinary.api_key}")
  private String cloudApiKey;

  @Value("${cloudinary.api_secret}")
  private String cloudApiSecret;

  @Bean(name = "com.cloudinary.cloud_name")
  public String getCloudinaryCloudName() {
    return cloudName;
  }

  @Bean(name = "com.cloudinary.api_key")
  public String getCloudinaryApiKey() {
    return cloudApiKey;
  }

  @Bean(name = "com.cloudinary.api_secret")
  public String getCloudinaryApiSecret() {
    return cloudApiSecret;
  }
}
