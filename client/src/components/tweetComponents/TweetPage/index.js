import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRepliesState, getTweetsState } from "../../../redux/tweet/selector";
import { useParams } from "react-router-dom";
import { TweetForm } from "../TweetForm";
import Tweet from "../Tweet";
import api, { URLS } from "../../../services/API";
import { handlerReplies } from "../../../redux/tweet/action";

export const TweetPage = () => {
  const tweets = useSelector(getTweetsState);
  const replies = useSelector(getRepliesState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [tweetInfo, setTweetInfo] = useState(null);
  useEffect(() => {
    (async function () {
      setTweetInfo(await api.get(URLS.TWEET.getTweet(id)));
    })();
    dispatch(handlerReplies(id));
  }, [tweets, id]);
  return (
    <>
      {tweetInfo && (
        <Box>
          <Tweet
            tweetInfo={tweetInfo}
            styles={{ "&:hover": { background: "none" } }}
          />
          <TweetForm
            placeholderText={"Tweet your reply"}
            tweetType={"Reply"}
            parentTweetId={id}
          />
          {replies.map((reply) => (
            <Tweet key={reply.id} tweetInfo={reply} />
          ))}
        </Box>
      )}
    </>
  );
};
