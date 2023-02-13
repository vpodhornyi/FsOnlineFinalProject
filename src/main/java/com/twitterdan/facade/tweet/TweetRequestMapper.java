package com.twitterdan.facade.tweet;

import com.twitterdan.domain.attachment.AttachmentImage;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.dto.tweet.TweetRequest;
import com.twitterdan.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TweetRequestMapper extends GeneralFacade<Tweet, TweetRequest> {
  public TweetRequestMapper() {
    super(Tweet.class, TweetRequest.class);
  }

  @Override
  public void decorateEntity(Tweet entity, TweetRequest dto) {

    Set<AttachmentImage> newAttachment =
            dto.getImages().stream().map(el -> new AttachmentImage(el, entity)).collect(Collectors.toSet());
    entity.setImages(newAttachment);
  }
}
