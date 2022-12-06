package com.twitterdan.dao;

import com.twitterdan.domain.attachment.AttachmentImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<AttachmentImage, Long> {
}
