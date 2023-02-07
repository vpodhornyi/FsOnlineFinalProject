import React, {createRef, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {Tweet} from "../../components";
import {getTweetsNew} from "../../redux/tweet/action";
import {getTweetState, loadingTweetsState,} from "../../redux/tweet/selector";
import Loading from "../../components/Loader/Loading";
import PropTypes from "prop-types";
import {URLS} from "../../services/API";

const Tweets = ({bookmarksValue = false}) => {
    const dispatch = useDispatch();

    const tweetState = useSelector(getTweetState);
    const mapArr = bookmarksValue ? tweetState.bookmarks.data : tweetState.tweets.data;
    const loadingTweets = useSelector(loadingTweetsState);
    useEffect(() => {
        bookmarksValue ? dispatch(getTweetsNew(URLS.TWEET.BOOKMARKS, 'bookmarks')) : dispatch(getTweetsNew(URLS.TWEET._ROOT, 'tweets'))
    }, []);
    const lastItem = createRef();
    const observerLoader = useRef();

    const actionInSight = (entries) => {
        const str = bookmarksValue ? 'bookmarks' : 'tweets';
        if (entries[0].isIntersecting && tweetState[str].totalPages) {
            bookmarksValue ? dispatch(getTweetsNew(URLS.TWEET.BOOKMARKS, 'bookmarks')) : dispatch(getTweetsNew(URLS.TWEET._ROOT, 'tweets'))
        }
    };

    useEffect(() => {
        if (observerLoader.current) observerLoader.current.disconnect();

        observerLoader.current = new IntersectionObserver(actionInSight);
        if (lastItem.current) observerLoader.current.observe(lastItem.current);
    }, [lastItem]);

    return (
        <BoxWrapper>
            {loadingTweets && <Loading/>}
            {mapArr?.map((e, i) => {
                const keyValue = e.id + e.retweetFollowedName
                if (i + 1 === mapArr.length) {
                    return (
                        <Tweet key={keyValue} tweetInfo={e} ref={lastItem}/>
                    );
                } else {
                    return (
                        <Tweet key={keyValue} tweetInfo={e}/>
                    );
                }

            })}
        </BoxWrapper>
    );
};

const styles = ({theme}) => ({
    width: "100%",
});

const BoxWrapper = styled(Box)(styles);
Tweets.propTypes = {
    bookmarksValue: PropTypes.bool,
};
export default Tweets;
