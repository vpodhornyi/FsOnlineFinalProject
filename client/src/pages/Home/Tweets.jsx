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
import { getPersonalData } from "../../redux/user/selector";

const Tweets = ({ bookmarksValue = false }) => {
  const dispatch = useDispatch();
  const bookmarksArr = useSelector(getBookmarksState);
  const tweets = useSelector(getTweetsState);
  const mapArr = bookmarksValue
    ? tweets.filter((tweet) => {
        return bookmarksArr.includes(tweet.id);
      })
    : tweets;
  const loadingTweets = useSelector(loadingTweetsState);
  useEffect(() => {
    dispatch(getTweets());
    dispatch(handlerBookmark());
  }, []);

  return (
    <BoxWrapper>
      {loadingTweets && <Loading />}
      {mapArr
        ?.filter((tweet) => tweet.tweetType === "TWEET")
        ?.map((e, i) => {
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
