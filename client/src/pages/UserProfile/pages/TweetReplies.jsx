import React, {useEffect, useState} from 'react';
import {getTweetReplies} from "../../../services/tweetService";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import {CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {Tweet} from "../../../components";

const TweetReplies = ({userId}) => {
    const {user_tag} = useParams();
    const [replies, setReplies] = useState(null);
    const user = useSelector(getPersonalData)

    const fetchReplies = async () => {
        const replies = await getTweetReplies(userId);
        setReplies(replies || []);
    }

    useEffect(() => {
        fetchReplies();
    }, []);

    if (!replies) {
        return <Container sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><CircularProgress disableShrink/></Container>
    }

    return (
        <>
            {replies.length > 0 ? replies.map(t =>
                <div key={t.id}>
                    <Tweet tweetInfo={t}/>
                </div>) :
                <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", maxWidth: "70%", margin: "0 auto"}}>
                    <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>{user?.userTag === user_tag ? `You ` : `@${user_tag}`} don`t have any replies yet.</Typography>
                </Box>
            }
        </>
    );
};

TweetReplies.propTypes = {
    userId: PropTypes.number
}

export default TweetReplies;