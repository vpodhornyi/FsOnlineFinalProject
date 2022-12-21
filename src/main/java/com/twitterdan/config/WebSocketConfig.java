package com.twitterdan.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws")
//      .setAllowedOrigins("http://localhost:3000")
      .setAllowedOrigins("*")
      .withSockJS();
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config
      .setApplicationDestinationPrefixes("/app")
      .enableStompBrokerRelay("/topic", "/queue")
      .setRelayHost("localhost")
      .setRelayPort(61613)
      .setClientLogin("guest")
      .setClientPasscode("guest");
    config.setApplicationDestinationPrefixes("/ws");
  }

/*  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic/", "/queue/");
    config.setApplicationDestinationPrefixes("/app");
  }*/
}
