package com.twitterdan.dto.notification;

import com.twitterdan.domain.notification.NotificationType;
import com.twitterdan.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NotificationResponse {
  private Long id;
  private NotificationType notificationType;
  private User userInitiator;
  private User userReceiver;
  private Date createdAt;
  private boolean isRead;
}
