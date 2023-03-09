package com.twitterdan.dao;

import com.twitterdan.domain.tweet.Tweet;
import com.twitterdan.domain.tweet.TweetType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {
  @Query(value = "SELECT tweets.* FROM tweets   \n" + "WHERE tweets.user_id=:userId AND tweets.tweet_type='TWEET'\n"
          + " UNION ALL \n"
          + "SELECT tweets.id, tweets.created_at,"
          + " tweets.created_by, tweets.updated_at, tweets.updated_by, tweets.uuid,  body ,   \n"
          + "parent_tweet_id, tweet_type, tweet_actions.user_id AS retweet_id,  tweets.user_id FROM tweets \n"
          + "JOIN tweet_actions ON tweet_actions.tweet_id =tweets.id \n"
          + "WHERE  tweet_actions.action_type=:type AND tweet_actions.user_id=:userId \n"
          + " ORDER BY created_at  DESC", nativeQuery = true)
  Optional<Page<Tweet>> findCurrentUserActionTweets(String type, Long userId, Pageable pageable);

  @Query(value =
          "  SELECT tweets.id, tweets.created_at, tweets.created_by,"
                  + " tweets.updated_at, tweets.updated_by, tweets.uuid,  body ,\n"
                  + "        parent_tweet_id, tweet_type, retweet_id,  tweets.user_id FROM tweets\n"
                  + "        JOIN tweet_actions ON tweet_actions.tweet_id =tweets.id\n"
                  + "        WHERE  tweet_actions.action_type='LIKE' AND tweet_actions.user_id=:userId\n"
                  + "        ORDER BY created_at  DESC", nativeQuery = true)
  Optional<Page<Tweet>> findCurrentUserLikeTweets(Long userId, Pageable pageable);


  @Query(value =
          "SELECT tweets.* FROM tweets JOIN followers ON followers.followed_id=tweets.user_id\n"
                  + "       WHERE  followers.follower_id=:userId AND tweets.tweet_type='TWEET'\n"
                  + "        ORDER BY created_at  DESC", countQuery =
          "SELECT count(*) from (SELECT tweets.* FROM tweets JOIN followers "
                  + "ON followers.followed_id=tweets.user_id  WHERE  "
                  + "followers.follower_id=:userId  AND  tweets.tweet_type='TWEET' "
                  + "ORDER BY created_at  DESC) AS\n"
                  + "        followersTweets",
          nativeQuery = true)
  Optional<Page<Tweet>> findFollowedTweetsAndRetweet(Long userId, Pageable pageable);

  @Query(value =
          "SELECT tweets.* FROM tweets JOIN tweet_actions ON tweets.id = tweet_actions.tweet_id  WHERE  tweet_actions\n"
                  + "        .user_id =:id  AND  tweet_actions.action_type='BOOKMARK' ORDER BY created_at  DESC",
          countQuery =
                  "SELECT count(*) from (SELECT tweets.* FROM tweets JOIN tweet_actions"
                          + " ON tweets.id = tweet_actions.tweet_id  WHERE  "
                          + "tweet_actions\n"
                          + "        .user_id =:id   AND  tweet_actions.action_type='BOOKMARK' "
                          + "ORDER BY created_at  DESC) AS\n"
                          + "        bookmarkTweets", nativeQuery = true)
  Optional<Page<Tweet>> findBookmarks(Long id, Pageable pageable);




  List<Tweet> findTweetsByTweetTypeAndParentTweetId(TweetType tweetType, Long parentTweetId);

  Optional<Page<Tweet>> findTweetsByUserId(Long userId, Pageable pageable);


  Page<Tweet> findAllByUserIdIsNot(Long userId, Pageable pageable);

}

