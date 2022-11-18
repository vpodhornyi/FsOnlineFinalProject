package com.twitterdan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class FsOnlineFinalProjectApplication {

  public static void main(String[] args) {
    SpringApplication.run(FsOnlineFinalProjectApplication.class, args);
  }

}
