import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import { useTheme } from "@emotion/react";
import Searchbar from "@components/Searchbar";
import Tweet from "../tweetComponents/Tweet";
import { TweetForm } from "../tweetComponents/TweetForm";
import { useDispatch, useSelector } from "react-redux";
import { getTweetsState, loadingTweetsState } from "../../redux/tweet/selector";
import { getTweets } from "../../redux/tweet/action";
import Loading from "../Loader/Loading";

const MainContainer = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tweets = useSelector(getTweetsState);
  const loadingTweets = useSelector(loadingTweetsState);
  useEffect(() => {
    dispatch(getTweets());
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      spacing={0}
      height="100vh"
      padding={0}
      margin={0}
    >
      <Grid
        item
        xl={7}
        lg={7}
        md={8}
        sm={12}
        height="100vh"
        justifyContent="center"
      >
        <>
          <TweetForm buttonText={"tweet"} />
          {loadingTweets && <Loading />}
          {tweets
            .filter((tweet) => tweet.tweetType === "TWEET")
            .map((e, i) => {
              return (
                <div key={e.id}>
                  <Tweet tweetInfo={e}  />
                </div>
              );
            })}
        </>
      </Grid>
      <Grid
        item
        justifyContent="center"
        height="100vh"
        xl={5}
        lg={5}
        md={4}
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
          [theme.breakpoints.up("md")]: {
            display: "block",
          },
        }}
      >
        <Searchbar />
      </Grid>
    </Grid>
  );
};
export default MainContainer;
