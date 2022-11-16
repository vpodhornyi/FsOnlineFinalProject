package com.twitterdan.utils.auth;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

public class GenerateKeys {
  public static void main(String[] args) {
    System.out.println(generateKey());
    System.out.println(generateKey());
  }

  public static String generateKey() {
    return Encoders.BASE64.encode(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded());
  }
}
