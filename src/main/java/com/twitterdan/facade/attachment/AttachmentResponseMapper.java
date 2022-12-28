package com.twitterdan.facade.attachment;

import com.twitterdan.domain.attachment.AttachmentImage;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.dto.attachment.AttachmentResponse;
import com.twitterdan.dto.tweet.TweetResponse;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class AttachmentResponseMapper extends GeneralFacade<AttachmentImage, AttachmentResponse> {
  public AttachmentResponseMapper() {
    super(AttachmentImage.class, AttachmentResponse.class);
  }

  @Override
  public void decorateEntity(AttachmentImage entity, AttachmentResponse dto) {

  }
}
