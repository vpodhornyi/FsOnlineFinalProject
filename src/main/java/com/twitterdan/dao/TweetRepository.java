package com.twitterdan.dao;

import com.twitterdan.domain.tweet.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {
  @Query(value = "SELECT TWEETS.*  FROM TWEETS Join TWEET_ACTIONS on TWEET_ACTIONS.TWEET_ID = TWEETS.ID \n"
          + " where TWEET_ACTIONS.ACTION_TYPE=:type AND TWEET_ACTIONS.USER_ID = "
          + ":userId", nativeQuery = true)
  List<Tweet> findCurrentUserActionTweets(String type, Long userId);

  List<Tweet> findTweetsByParentTweetIdIsNull();

  @Query(value =
          "  SELECT TWEETS.* FROM TWEETS Join FOLLOWERS on FOLLOWERS.FOLLOWED_ID= TWEETS.USER_ID  where  FOLLOWERS.FOLLOWER_ID=1 and TWEETS.TWEET_TYPE='TWEET' UNION all SELECT TWEETS.ID,\tTWEETS.CREATED_AT, \tTWEETS.CREATED_BY,\tTWEETS.UPDATED_AT,  \tTWEETS.UPDATED_BY,  \tTWEETS.UUID,  \tTWEETS.BODY,  \tTWEETS.PARENT_TWEET_ID, TWEET_ACTIONS.USER_ID as retweet_id,   \tTWEETS.TWEET_TYPE,  \tTWEETS.USER_ID   FROM TWEETS Join TWEET_ACTIONS on TWEET_ACTIONS.TWEET_ID = TWEETS.ID  where TWEET_ACTIONS.ACTION_TYPE='RETWEET' AND TWEET_ACTIONS.USER_ID in (select followers.followed_id from followers where followers.follower_id=1)\n"
                  + "  ORDER BY CREATED_AT  DESC", nativeQuery = true)
  List<Tweet> findFollowedTweetsAndRetweet(Long userId);

  List<Tweet> findTweetsByUserId(Long userId);

  @Query(value = "Select * from TWEETS where TWEET_TYPE=:type and PARENT_TWEET_ID=:id ",
          nativeQuery = true)
  List<Tweet> findReplies(String type, Long id);
}
//  SELECT TWEETS.*, TWEETS.PARENT_TWEET_ID as retweet_id FROM TWEETS Join FOLLOWERS on FOLLOWERS.FOLLOWED_ID= TWEETS.USER_ID  where  FOLLOWERS.FOLLOWER_ID=1 and TWEETS.TWEET_TYPE='TWEET' UNION all SELECT TWEETS.*,TWEET_ACTIONS.USER_ID as retweet_id  FROM TWEETS Join TWEET_ACTIONS on TWEET_ACTIONS.TWEET_ID = TWEETS.ID  where TWEET_ACTIONS.ACTION_TYPE='RETWEET' AND TWEET_ACTIONS.USER_ID in (select followers.followed_id from followers where followers.follower_id=1)
//        ORDER BY CREATED_AT  DESC
//SELECT TWEETS.* FROM TWEETS Join FOLLOWERS on FOLLOWERS.FOLLOWED_ID= TWEETS.USER_ID  where  FOLLOWERS.FOLLOWER_ID=1 and TWEETS.TWEET_TYPE='TWEET' UNION all SELECT TWEETS.ID, TWEETS.CREATED_AT, TWEETS.CREATED_BY, TWEETS.UPDATED_AT,  TWEETS.UPDATED_BY,   TWEETS.UUID,   TWEETS.BODY,   TWEETS.PARENT_TWEET_ID, TWEET_ACTIONS.USER_ID as retweet_id,    TWEETS.TWEET_TYPE,   TWEETS.USER_ID   FROM TWEETS Join TWEET_ACTIONS on TWEET_ACTIONS.TWEET_ID = TWEETS.ID  where TWEET_ACTIONS.ACTION_TYPE='RETWEET' AND TWEET_ACTIONS.USER_ID in (select followers.followed_id from followers where followers.follower_id=1)
//        ORDER BY CREATED_AT  DESC
