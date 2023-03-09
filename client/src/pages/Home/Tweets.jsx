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
import {useParams} from "react-router-dom";
import { replaceDuplicatesByProperty } from "../../utils/replaceDuplicatesByProperty";

const Tweets = ({
  stateValue = {
    name: "tweets",
    url: URLS.TWEET._ROOT,
    showReply: false,
  },
}) => {
  const {user_tag} = useParams();
  const dispatch = useDispatch();
  const tweetState = useSelector(getTweetState);
  const loadingTweets = useSelector(loadingTweetsState);
  const currentState = tweetState[stateValue.name];
  useEffect(() => {
    dispatch(resetStateValue(stateValue.name));
    dispatch(getTweets(stateValue.url, stateValue.name));
  }, [user_tag]);
  const lastItem = createRef();
  const observerLoader = useRef();
  const actionInSight = (entries) => {
    if (
      entries[0].isIntersecting &&
      !loadingTweets &&
      currentState.totalPages
    ) {
      dispatch(getTweets(stateValue.url, stateValue.name));
    }
  };

  const unique = replaceDuplicatesByProperty(currentState.data, "key");

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }
    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current);
    }
  }, [lastItem]);

  return (
    <BoxWrapper>
      {unique?.map((e, i) => {
        if (e.tweetType === "REPLY" && !stateValue.showReply) {
          return;
        }
        const keyValue = e.id + e.retweetFollowedName + i;
        if (i + 1 === unique?.length) {
          return <Tweet key={keyValue} tweetInfo={e} ref={lastItem} />;
        } else {
          return <Tweet key={keyValue} tweetInfo={e} />;
        }
      })}
      {loadingTweets && <Loading />}
      {!loadingTweets && !currentState.data.length && stateValue?.emptyList}
    </BoxWrapper>
  );
};

const styles = ({ theme }) => ({
  maxWidth: "100%",
  paddingBottom: "56px",
});

const BoxWrapper = styled(Box)(styles);
Tweets.propTypes = {
  stateValue: PropTypes.object,
};
export default Tweets;
