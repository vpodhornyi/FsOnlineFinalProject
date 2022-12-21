package com.twitterdan.config;

import com.twitterdan.domain.chat.Message;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

//@EnableRabbit
//@Component
public class RabbitMqListener {

  @RabbitListener
  public void processMessages(Message message) {
    System.out.println(message);
  }
}
