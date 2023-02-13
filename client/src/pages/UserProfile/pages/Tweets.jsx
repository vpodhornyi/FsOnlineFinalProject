import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {getUserTweets} from "../../../services/tweetService";
import {CircularProgress, Typography} from "@mui/material";
import {Tweet} from "../../../components";
import {BoxContainer, StyledLoadContainer} from "../../../components/StyledComponents/styledComponents";

const Tweets = () => {
    const {user_tag} = useParams();
    const [tweets, setTweets] = useState(null);
    const user = useSelector(getPersonalData);
    const fetchTweets = async () => {
        const tweets = await getUserTweets(user_tag);
        setTweets(tweets || []);
    }

    useEffect(() => {
        fetchTweets();
    }, []);

    if (!tweets) {
        return <StyledLoadContainer><CircularProgress disableShrink/></StyledLoadContainer>
    }

    return (
        <>
            {tweets.length > 0 ? tweets?.filter(t => t.tweetType !== "REPLY")?.map(el =>
                <div key={el.id}>
                    <Tweet tweetInfo={el}/>
                </div>
            ) :
                <BoxContainer>
                    <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>{user?.userTag === user_tag ? `You ` : `@${user_tag}`} don’t have any tweets yet</Typography>
                    <Typography variant={"subtitle2"}>The tweet will be shown as soon as it is published</Typography>
                </BoxContainer>
            }
        </>
    );
};

export default Tweets;