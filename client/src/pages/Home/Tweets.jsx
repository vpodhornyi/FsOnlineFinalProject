import React, {createRef, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Tweet } from "../../components";
import {getTweets, getTweetsNew, handlerBookmark} from "../../redux/tweet/action";
import {
  getBookmarksState,
  getTweetsState, getTweetState,
  loadingTweetsState,
} from "../../redux/tweet/selector";
import Loading from "../../components/Loader/Loading";
import PropTypes from "prop-types";

const Tweets = ({ bookmarksValue = false }) => {
  const dispatch = useDispatch();

  // const bookmarksArr = useSelector(getBookmarksState);
  const tweetState = useSelector(getTweetState);
  const mapArr = tweetState.tweets;
  const loadingTweets = useSelector(loadingTweetsState);
  useEffect(() => {
    dispatch(getTweetsNew())
  }, []);
  const lastItem = createRef();
  const observerLoader = useRef();

  const actionInSight = (entries) => {

    if (entries[0].isIntersecting &&  tweetState.totalPages) {
      dispatch(getTweetsNew())
    }
  };

  useEffect(() => {
    console.log(lastItem)
    if (observerLoader.current) observerLoader.current.disconnect();

    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) observerLoader.current.observe(lastItem.current);
  }, [lastItem]);

  return (
      <BoxWrapper>
        {loadingTweets && <Loading />}
        {mapArr.length>0&&mapArr.map((e, i) => {

          if(i + 1 === mapArr.length){

            return (
                <Tweet  key={e.id} tweetInfo={e} ref={lastItem}/>
            );
          }
          return (
              <Tweet  key={e.id} tweetInfo={e}/>
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
