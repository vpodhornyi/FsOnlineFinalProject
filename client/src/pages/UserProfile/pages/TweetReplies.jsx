import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {CircularProgress} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {Tweet} from "../../../components";
import {StyledLoadContainer} from "./styledComponents";
import {getTweetsState, loadingTweetsState} from "../../../redux/tweet/selector";
import {getCurrentUserTweetsAndReplies} from "../../../redux/tweet/action";
import NoData from "../components/NoData";
import {replaceDuplicatesByProperty} from "../../../utils/replaceDuplicatesByProperty";

const TweetReplies = ({userId}) => {
    const {user_tag} = useParams();
    const user = useSelector(getPersonalData)
    const dispatch = useDispatch();
    const tweets = useSelector(getTweetsState);
    const loading = useSelector(loadingTweetsState);

    useEffect(() => {
        dispatch(getCurrentUserTweetsAndReplies(userId, user_tag))
    }, []);

    const unique = replaceDuplicatesByProperty(tweets?.data, "key")

    if (loading) {
        return <StyledLoadContainer><CircularProgress disableShrink/></StyledLoadContainer>
    }

    return (
        <>
            {unique?.length > 0 ? unique?.map(t =>
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