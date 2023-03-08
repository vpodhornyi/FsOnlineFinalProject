import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Tweet} from "../../../components";
import {CircularProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {StyledLoadContainer} from "./styledComponents";
import {getTweetsState, loadingTweetsState} from "../../../redux/tweet/selector";
import {getCurrentUserLikes} from "../../../redux/tweet/action";
import NoData from "../components/NoData";
import Tweets from "../../Home/Tweets";

const Likes = () => {
    const {user_tag} = useParams();
    const user = useSelector(getPersonalData);
    const dispatch = useDispatch();
    const likes = useSelector(getTweetsState);
    const loading = useSelector(loadingTweetsState);

    useEffect( () => {
        dispatch(getCurrentUserLikes(user_tag));
    }, []);

    if (loading) {
        return <StyledLoadContainer><CircularProgress disableShrink/></StyledLoadContainer>
    }

    return (
        <>
            {/*<Tweets/>*/}
            {likes.data.length > 0 ? likes?.data?.map(tweet =>
                    <div key={tweet.id}>
                        <Tweet tweetInfo={tweet}/>
                    </div>
                ) :
                <NoData text={`${user?.userTag === user_tag ? `You ` : `@${user_tag}`} don't have any likes yet.`}/>
            }
        </>
    );
};

export default Likes;