package com.twitterdan.domain;

import lombok.Data;

@Data
public class Notification {

    private String destination;
    private String message;

    public Notification(String destination, String message){
        this.destination = destination;
        this.message = message;
    }
}
