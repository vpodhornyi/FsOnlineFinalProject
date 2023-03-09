import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {CircularProgress} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {Tweet} from "../../../components";
import {StyledLoadContainer} from "./styledComponents";
import {
    getTweetsState,
    loadingTweetsState,
} from "../../../redux/tweet/selector";
import NoData from "../components/NoData";
import {replaceDuplicatesByProperty} from "../../../utils/replaceDuplicatesByProperty";
import Tweets from "../../Home/Tweets";
import {URLS} from "../../../services/API";

const TweetReplies = ({userId}) => {
    const {user_tag} = useParams();
    const user = useSelector(getPersonalData);

    return (
        <>
            <Tweets stateValue={{
                name: "tweets",
                url: `${URLS.TWEET.USER_REPLIES}?id=${userId}`,
                showReply: true,
                emptyList: <NoData text={`${user?.userTag === user_tag ? `You ` : `@${user_tag}`} don't have any replies yet.`}/>
            }}/>
        </>
    );
};

TweetReplies.propTypes = {
    userId: PropTypes.number,
};

export default TweetReplies;
