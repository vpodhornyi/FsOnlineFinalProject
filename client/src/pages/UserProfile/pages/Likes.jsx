import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getUserLikes} from "../../../services/tweetService";
import {Tweet} from "../../../components";
import {CircularProgress, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {BoxContainer, StyledLoadContainer} from "../../../components/StyledComponents/styledComponents";

const Likes = () => {
    const {user_tag} = useParams();
    const [likes, setLikes] = useState(null);
    const user = useSelector(getPersonalData)

    const fetchLikes = async () => {
        const likes = await getUserLikes(user_tag);
        setLikes(likes || []);
    }
    useEffect( () => {
        fetchLikes();
    }, []);

    if (!likes) {
        return <StyledLoadContainer><CircularProgress disableShrink/></StyledLoadContainer>
    }

    return (
        <>
            {likes.length > 0 ? likes?.map(tweet =>
                    <div key={tweet.id}>
                        <Tweet tweetInfo={tweet}/>
                    </div>
                ) :
                <BoxContainer>
                    <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>{user?.userTag === user_tag ? `You ` : `@${user_tag}`} don’t have any likes yet</Typography>
                    <Typography variant={"subtitle2"}>Tap the heart on any Tweet to show it some love. When you do, it’ll show up here.
                    </Typography>
                </BoxContainer>
            }
        </>
    );
};

export default Likes;