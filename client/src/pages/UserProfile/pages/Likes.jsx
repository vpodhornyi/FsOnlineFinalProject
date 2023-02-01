import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getUserLikes} from "../../../services/tweetService";
import {Tweet} from "../../../components";
import Box from "@mui/material/Box";
import {CircularProgress, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";

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
        return <Container sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><CircularProgress disableShrink/></Container>
    }

    return (
        <>
            {likes.length > 0 ? likes?.map(tweet =>
                    <div key={tweet.id}>
                        <Tweet tweetInfo={tweet}/>
                    </div>
                ) :
                <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", maxWidth: "70%", margin: "0 auto"}}>
                    <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>{user?.userTag === user_tag ? `You ` : `@${user_tag}`} don’t have any likes yet</Typography>
                    <Typography variant={"subtitle2"}>Tap the heart on any Tweet to show it some love. When you do, it’ll show up here.
                    </Typography>
                </Box>
            }
        </>
    );
};

export default Likes;