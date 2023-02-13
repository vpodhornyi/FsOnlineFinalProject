import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {CircularProgress} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {Tweet} from "../../../components";
import {StyledLoadContainer} from "../../../components/StyledComponents/styledComponents";
import {getTweetsState, loadingTweetsState} from "../../../redux/tweet/selector";
import {getCurrentUserReplies} from "../../../redux/tweet/action";
import NoData from "../components/NoData";

const TweetReplies = ({userId}) => {
    const {user_tag} = useParams();
    const user = useSelector(getPersonalData)
    const dispatch = useDispatch();
    const replies = useSelector(getTweetsState);
    const loading = useSelector(loadingTweetsState);

    useEffect(() => {
        dispatch(getCurrentUserReplies(userId));
    }, []);

    if (loading) {
        return <StyledLoadContainer><CircularProgress disableShrink/></StyledLoadContainer>
    }

    return (
        <>
            {replies.data.length > 0 ? replies?.data?.map(t =>
                <div key={t.id}>
                    <Tweet tweetInfo={t}/>
                </div>) :
                <NoData text={`${user?.userTag === user_tag ? `You ` : `@${user_tag}`} don't have any replies yet.`}/>
            }
        </>
    );
};

TweetReplies.propTypes = {
    userId: PropTypes.number
}

export default TweetReplies;