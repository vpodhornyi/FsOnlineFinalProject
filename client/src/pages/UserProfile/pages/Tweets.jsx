import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {getTweetsState, loadingTweetsState} from "../../../redux/tweet/selector";
import {CircularProgress} from "@mui/material";
import {Tweet} from "../../../components";
import {StyledLoadContainer} from "../../../components/StyledComponents/styledComponents";
import {getCurrentUserTweets} from "../../../redux/tweet/action";
import NoData from "../components/NoData";
import {replaceDuplicatesByProperty} from "../../../utils/replaceDuplicatesByProperty";

const Tweets = () => {
    const {user_tag} = useParams();
    const user = useSelector(getPersonalData);
    const dispatch = useDispatch();
    const tweets = useSelector(getTweetsState);
    const loading = useSelector(loadingTweetsState);


    useEffect(() => {
        dispatch(getCurrentUserTweets(user_tag));
    }, []);

    const unique = replaceDuplicatesByProperty(tweets?.data, "key");

    if (loading) {
        return <StyledLoadContainer><CircularProgress disableShrink/></StyledLoadContainer>
    }

    return (
        <>
            {unique?.length > 0 ? unique?.filter(t => t.tweetType !== "REPLY")?.map(el =>
                <div key={el.id}>
                    <Tweet tweetInfo={el}/>
                </div>
            ) :
                <NoData text={`${user?.userTag === user_tag ? `You ` : `@${user_tag}`} don’t have any tweets yet}`}/>
            }
        </>
    );
};

export default Tweets;