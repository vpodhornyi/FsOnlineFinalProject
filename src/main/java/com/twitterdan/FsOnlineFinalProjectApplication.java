package com.twitterdan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;

@EnableJpaAuditing
@SpringBootApplication
public class FsOnlineFinalProjectApplication {

  public static void main(String[] args) {
    SpringApplication.run(FsOnlineFinalProjectApplication.class, args);
  }

}
