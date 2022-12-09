import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {Tweet} from "../../components";
import {getTweets} from "../../redux/tweet/action";
import {getBookmarksState, getTweetsState, loadingTweetsState} from "../../redux/tweet/selector";
import Loading from "../../components/Loader/Loading";
import PropTypes from "prop-types";

const Tweets = ({bookmarksValue = false}) => {
    const dispatch = useDispatch();
    const bookmarksArr = useSelector(getBookmarksState);
    const tweets = useSelector(getTweetsState);
    const mapArr = bookmarksValue ? tweets.filter(tweet => bookmarksArr.includes(tweet.id)) : tweets
    const loadingTweets = useSelector(loadingTweetsState);
    useEffect(() => {
        dispatch(getTweets());

    }, []);

    return (
        <BoxWrapper>
            {loadingTweets && <Loading/>}
            {mapArr?.filter((tweet) => tweet.tweetType === "TWEET")?.map((e, i) => {
                return (
                    <div key={e.id}>
                        <Tweet tweetInfo={e}/>
                    </div>
                );
            })}
        </BoxWrapper>);
}

const styles = ({theme}) => ({
    width: '100%',
});

const BoxWrapper = styled(Box)(styles);
Tweets.propTypes = {
    bookmarksValue: PropTypes.bool,
};
export default Tweets;
