import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {getTweetState, loadingTweetsState} from "../../../redux/tweet/selector";
import {getAuthorized} from "../../../redux/auth/selector";
import Tweets from "../../Home/Tweets";
import {URLS} from "../../../services/API";
import {replaceDuplicatesByProperty} from "../../../utils/replaceDuplicatesByProperty";

const UserTweets = () => {
    const {user_tag} = useParams();
    const tweetState = useSelector(getTweetState);

    // if (loading) {
    //     return <StyledLoadContainer><CircularProgress disableShrink/></StyledLoadContainer>
    // }

    return (
        <>
            <Tweets stateValue={{name: "tweets", url: `${URLS.TWEET.USER_TWEETS}?userTag=${user_tag}`}}/>

            {/*{unique?.length > 0 ? unique?.filter(t => t.tweetType !== "REPLY")?.map(el =>*/}
            {/*    <div key={el.id}>*/}
            {/*        <Tweet tweetInfo={el}/>*/}
            {/*    </div>*/}
            {/*) :*/}
            {/*    <NoData text={`${user?.userTag === user_tag ? `You ` : `@${user_tag}`} don’t have any tweets yet.`}/>*/}
            {/*}*/}
        </>
    );
};

export default UserTweets;