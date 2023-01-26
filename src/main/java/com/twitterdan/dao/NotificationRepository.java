package com.twitterdan.dao;

import com.twitterdan.domain.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Optional<Notification> getNotificationById(Long id);
    void deleteNotificationById(Long id);

}
