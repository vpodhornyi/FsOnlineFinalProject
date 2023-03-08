import React from 'react';
import {useParams} from "react-router-dom";
import NoData from "../components/NoData";
import Tweets from "../../Home/Tweets";
import {URLS} from "../../../services/API";

const Likes = () => {
    const {user_tag} = useParams();

    return (
        <>
            <Tweets stateValue={{name: "tweets", url: `${URLS.TWEET.USER_LIKES}?userTag=${user_tag}`}}/>
            {/*{likes.data.length > 0 ? likes?.data?.map(tweet =>*/}
            {/*        <div key={tweet.id}>*/}
            {/*            <Tweet tweetInfo={tweet}/>*/}
            {/*        </div>*/}
            {/*    ) :*/}
            {/*    <NoData text={`${user?.userTag === user_tag ? `You ` : `@${user_tag}`} don't have any likes yet.`}/>*/}
            {/*}*/}
        </>
    );
};

export default Likes;