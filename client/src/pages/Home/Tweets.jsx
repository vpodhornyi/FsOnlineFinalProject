import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Tweet } from "../../components";
import { getTweets, handlerBookmark } from "../../redux/tweet/action";
import {
  getBookmarksState,
  getTweetsState,
  loadingTweetsState,
} from "../../redux/tweet/selector";
import Loading from "../../components/Loader/Loading";
import PropTypes from "prop-types";

const Tweets = ({ bookmarksValue = false }) => {
  const dispatch = useDispatch();
  const bookmarksArr = useSelector(getBookmarksState);
  const tweets = useSelector(getTweetsState);
  const mapArr = tweets.filter((tweet) => {
    return bookmarksValue
      ? bookmarksArr.includes(tweet.id)
      : tweet.tweetType !== "REPLY";
  });
  const loadingTweets = useSelector(loadingTweetsState);
  useEffect(() => {
    dispatch(getTweets());
    dispatch(handlerBookmark());
  }, []);

  return (
    <BoxWrapper>
      {loadingTweets && <Loading />}
      {mapArr?.map((e, i) => {
        return (
          <div key={e.id}>
            <Tweet tweetInfo={e} />
          </div>
        );
      })}
    </BoxWrapper>
  );
};

const styles = ({ theme }) => ({
  width: "100%",
});

const BoxWrapper = styled(Box)(styles);
Tweets.propTypes = {
  bookmarksValue: PropTypes.bool,
};
export default Tweets;
