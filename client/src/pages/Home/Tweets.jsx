import React, { createRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Tweet } from "../../components";
import { getTweets, resetStateValue } from "../../redux/tweet/action";
import { getTweetState, loadingTweetsState } from "../../redux/tweet/selector";
import Loading from "../../components/Loader/Loading";
import PropTypes from "prop-types";
import { URLS } from "../../services/API";
import EmptyBookmark from "../Bookmarks/EmptyBookmark";

const Tweets = ({
  stateValue = {
    name: "tweets",
    url: URLS.TWEET._ROOT,
  },
}) => {
  const dispatch = useDispatch();
  const tweetState = useSelector(getTweetState);
  const loadingTweets = useSelector(loadingTweetsState);
  const currentState = tweetState[stateValue.name];
  useEffect(() => {
    dispatch(resetStateValue(stateValue.name));
    dispatch(getTweets(stateValue.url, stateValue.name));
  }, []);
  const lastItem = createRef();
  const observerLoader = useRef();
  const actionInSight = (entries) => {
    if (entries[0].isIntersecting && currentState.totalPages) {
      dispatch(getTweets(stateValue.url, stateValue.name));
    }
  };

  useEffect(() => {
    if (observerLoader.current) observerLoader.current.disconnect();

    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) observerLoader.current.observe(lastItem.current);
  }, [lastItem]);
  if (loadingTweets) {
    return <Loading />;
  }
  if (!loadingTweets) {
    return (
      <BoxWrapper>
        {currentState.data?.map((e, i) => {
          if (e.tweetType === "REPLY") {
            return;
          }
          const keyValue = e.id + e.retweetFollowedName;
          if (i + 1 === currentState.data.length) {
            return <Tweet key={keyValue} tweetInfo={e} ref={lastItem} />;
          } else {
            return <Tweet key={keyValue} tweetInfo={e} />;
          }
        })}
        {stateValue.name === "bookmarks" && !currentState.data.length && (
          <EmptyBookmark />
        )}
      </BoxWrapper>
    );
  }
};

const styles = ({ theme }) => ({
  width: "100%",
});

const BoxWrapper = styled(Box)(styles);
Tweets.propTypes = {
  stateValue: PropTypes.object,
};
export default Tweets;
