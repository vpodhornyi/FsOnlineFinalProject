import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRepliesState, getTweetsState } from "../../../redux/tweet/selector";
import { useParams } from "react-router-dom";
import { TweetForm } from "../TweetForm";
import Tweet from "../Tweet";

export const TweetPage = () => {
  const tweets = useSelector(getTweetsState);
  const replies = useSelector(getRepliesState);
  const { id } = useParams();
    console.log(tweets)
  const tweetInfo = tweets?.find((el) => el.id === +id);
  useEffect(() => {

  }, []);
  return (
    <Box>
      <Tweet tweetInfo={tweetInfo} styles={{"&:hover":{background:"none"}}} />
      <TweetForm placeholderText={"Tweet your reply"} tweetType={"REPLY"}    parentTweetId={id}/>
      {replies.map((reply) => (
        <Tweet key={reply.id} tweetInfo={reply} />
      ))}
    </Box>
  );
};
