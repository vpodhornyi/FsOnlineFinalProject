package com.twitterdan.controller;

import com.twitterdan.domain.notification.Notification;
import com.twitterdan.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/notifications")
public class NotificationsController {

    private final NotificationService notificationService;

    @PostMapping()
    public void saveNotification(@RequestBody Notification notification){
        notificationService.saveNotification(notification);
    }

    @GetMapping()
    public Optional<Notification> getNotificationById(Long id) {

        return notificationService.getNotificationById(id);
    }

    @GetMapping("/all")
    public List<Notification> getAllNotifications() {

        return notificationService.getAllNotifications();
    }

    @PutMapping()
    public void deactivateNotificationById(Long id) {
        notificationService.deactivateNotificationById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteNotificationById(@PathVariable("id") Long id) {
        System.out.println("in controller.deleteNotificationById(Long id), id: " +id);
        notificationService.deleteNotificationById(id);
        return ResponseEntity.ok(true);
    }

}
