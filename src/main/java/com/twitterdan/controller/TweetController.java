package com.twitterdan.controller;

import com.twitterdan.domain.dto.tweetDto.TweetRequest;
import com.twitterdan.domain.dto.tweetDto.TweetResponse;
import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.facade.tweetFacade.TweetRequestMapper;
import com.twitterdan.facade.tweetFacade.TweetResponseMapper;
import com.twitterdan.service.TweetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/tweets")
@Slf4j
public class TweetController {

        private final TweetService tweetService;
        private final TweetRequestMapper tweetRequestMapper;
        private final TweetResponseMapper tweetResposnseMapper;

        public TweetController(TweetService tweetService, TweetRequestMapper tweetRequestMapper, TweetResponseMapper tweetResponseMapper) {
            this.tweetService = tweetService;
            this.tweetRequestMapper = tweetRequestMapper;
            this.tweetResposnseMapper = tweetResponseMapper;
        }


        @GetMapping
        public List<TweetResponse> getAll() {
            List<Tweet> tweets = tweetService.getAll();
            if (tweets.size() == 0) {
                log.info("empty list");
            }
            return tweets.stream().map(tweetResposnseMapper::convertToDto).collect(Collectors.toList());
        }

        @GetMapping("/{id}")
        public TweetResponse getById(@PathVariable("id") String userId) {
            Tweet tweet = tweetService.findById(Long.parseLong(userId));
            if (tweet.equals(new Tweet())) {
                log.info("Tweet isEmpty");
            }
            return tweetResposnseMapper.convertToDto(tweet);
        }

        @DeleteMapping("/{id}")
        public void delete(@PathVariable("id") String userId) {
            Long id = Long.parseLong(userId);
            if (tweetService.findById(id).equals(new Tweet())) {
                log.warn("The list has no element with this id");
            }
            tweetService.deleteById(id);
        }

        @PutMapping("/update")
        public void update(@Valid @RequestBody TweetRequest dto) {
            Tweet tweet = tweetRequestMapper.convertToEntity(dto);
            log.info(tweet + " - Object for update Tweet  ");
           tweetService.save(tweet);
        }

        @PostMapping("/create")
        public void create(@RequestBody TweetRequest dto) {
            Tweet tweet = tweetRequestMapper.convertToEntity(dto);
            log.info(tweet + " - Object for create Tweet  ");
            tweetService.save(tweet);
        }


        @ExceptionHandler({Exception.class, MethodArgumentNotValidException.class})
        public ResponseEntity<Object> handleException(Exception ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }

}
