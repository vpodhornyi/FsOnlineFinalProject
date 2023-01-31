package com.twitterdan.dao;

import com.twitterdan.domain.tweet.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {
  @Query(value = "SELECT tweets.* FROM tweets   \n"
          + "WHERE tweets.user_id=:userId AND tweets.tweet_type='TWEET'\n"
          + " UNION ALL \n"
          + "SELECT tweets.id, tweets.created_at, tweets.created_by, tweets.updated_at, tweets.updated_by, tweets.uuid,  body ,   \n"
          + "parent_tweet_id, tweet_type, tweet_actions.user_id AS retweet_id,  tweets.user_id FROM tweets \n"
          + "JOIN tweet_actions ON tweet_actions.tweet_id =tweets.id \n"
          + "WHERE  tweet_actions.action_type=:type AND tweet_actions.user_id=:userId \n"
          + " ORDER BY created_at  DESC", nativeQuery = true)
  List<Tweet> findCurrentUserActionTweets(String type, Long userId);
  @Query(value ="  SELECT tweets.id, tweets.created_at, tweets.created_by, tweets.updated_at, tweets.updated_by, tweets.uuid,  body ,\n"
          + "        parent_tweet_id, tweet_type, retweet_id,  tweets.user_id FROM tweets\n"
          + "        JOIN tweet_actions ON tweet_actions.tweet_id =tweets.id\n"
          + "        WHERE  tweet_actions.action_type='LIKE' AND tweet_actions.user_id=:userId\n"
          + "        ORDER BY created_at  DESC", nativeQuery = true)
          List<Tweet>findCurrentUserLikeTweets(Long userId);
  @Query(value =
          "SELECT tweets.* FROM tweets JOIN followers ON followers.followed_id=tweets.user_id \n"
                  + " WHERE  followers.follower_id=:userId AND tweets.tweet_type='TWEET' \n"
                  + "UNION ALL \n"
                  + "SELECT tweets.id, tweets.created_at, tweets.created_by, tweets.updated_at, tweets.updated_by, tweets.uuid,  body ,   \n"
                  + "parent_tweet_id,tweet_type, tweet_actions.user_id AS retweet_id,  tweets.user_id FROM tweets \n"
                  + "JOIN tweet_actions ON tweet_actions.tweet_id =tweets.id \n"
                  + "WHERE tweet_actions.action_type='RETWEET' AND tweet_actions.user_id IN (SELECT followers.followed_id \n"
                  + "  FROM followers WHERE followers.follower_id=:userId)\n"
                  + " ORDER BY created_at  DESC", nativeQuery = true)
  List<Tweet> findFollowedTweetsAndRetweet(Long userId);
  @Query(value = "Select * from TWEETS where TWEET_TYPE=:type and PARENT_TWEET_ID=:id ",
          nativeQuery = true)
  List<Tweet> findReplies(String type, Long id);
  List<Tweet> findTweetsByParentTweetIdIsNull();
  List<Tweet> findTweetsByUserId(Long userId);
}



////////////////////////////////////////////findFollowedTweetsAndRetweet////////////////////////////////////////
//  SELECT tweets.* FROM tweets JOIN followers ON followers.followed_id=tweets.user_id
//        WHERE  followers.follower_id=3 AND tweets.tweet_type='TWEET'
//        UNION ALL
//        SELECT tweets.id, tweets.created_at, tweets.created_by, tweets.updated_at, tweets.updated_by, tweets.uuid,  body ,
//        parent_tweet_id,tweet_type, tweet_actions.user_id AS retweet_id,  tweets.user_id FROM tweets
//        JOIN tweet_actions ON tweet_actions.tweet_id =tweets.id
//        WHERE tweet_actions.action_type='RETWEET' AND tweet_actions.user_id IN (SELECT followers.followed_id
//        FROM followers WHERE followers.follower_id=3)
//        ORDER BY created_at  DESC
//////////////////////findCurrentUserActionTweets///////////////////////////////////
//SELECT tweets.* FROM tweets
//        WHERE tweets.user_id=2 AND tweets.tweet_type='TWEET'
//        UNION ALL
//        SELECT tweets.id, tweets.created_at, tweets.created_by, tweets.updated_at, tweets.updated_by, tweets.uuid,  body ,
//        parent_tweet_id, tweet_type, tweet_actions.user_id AS retweet_id,  tweets.user_id FROM tweets
//        JOIN tweet_actions ON tweet_actions.tweet_id =tweets.id
//        WHERE  tweet_actions.action_type='RETWEET' AND tweet_actions.user_id=2
//        ORDER BY created_at  DESC
///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////findCurrentUserLikeTweets//////////////////////////////////////////////////
//SELECT tweets.id, tweets.created_at, tweets.created_by, tweets.updated_at, tweets.updated_by, tweets.uuid,  body ,parent_tweet_id, tweet_type, retweet_id,  tweets.user_id FROM tweets
//        JOIN tweet_actions ON tweet_actions.tweet_id =tweets.id
//        WHERE  tweet_actions.action_type='LIKE' AND tweet_actions.user_id=2
//        ORDER BY created_at  DESC
/////////////////////////////////////////////////////////////////////////////////////////////////////////////