import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {getUserTweets} from "../../../services/tweetService";
import Container from "@mui/material/Container";
import {CircularProgress, Typography} from "@mui/material";
import {Tweet} from "../../../components";
import Box from "@mui/material/Box";

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
        return <Container sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><CircularProgress disableShrink/></Container>
    }

    return (
        <>
            {tweets.length > 0 ? tweets?.filter(t => t.tweetType !== "REPLY")?.map(el =>
                <div key={el.id}>
                    <Tweet tweetInfo={el}/>
                </div>
            ) :
                <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", maxWidth: "70%", margin: "0 auto"}}>
                    <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>{user?.userTag === user_tag ? `You ` : `@${user_tag}`} don’t have any tweets yet</Typography>
                    <Typography variant={"subtitle2"}>The tweet will be shown as soon as it is published</Typography>
                </Box>
            }
        </>
    );
};

export default Tweets;