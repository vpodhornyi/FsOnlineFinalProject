import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import Tweets from "../../Home/Tweets";
import {URLS} from "../../../services/API";
import NoData from "../components/NoData";

const UserTweets = () => {
    const {user_tag} = useParams();
    const user = useSelector(getPersonalData)

    return (
        <>
            <Tweets stateValue={{
                name: "tweets",
                url: `${URLS.TWEET.USER_TWEETS}?userTag=${user_tag}`,
                showReply: true,
                emptyList: <NoData
                    text={`${user?.userTag === user_tag ? `You ` : `@${user_tag}`} don’t have any tweets yet.`}/>
            }}/>
        </>
    );
};

export default UserTweets;