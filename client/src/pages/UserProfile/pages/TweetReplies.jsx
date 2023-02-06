import React, {useEffect, useState} from 'react';
import {getTweetReplies} from "../../../services/tweetService";
import PropTypes from "prop-types";
import {CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";
import {Tweet} from "../../../components";
import {BoxContainer, StyledLoadContainer} from "../../../components/StyledComponents/styledComponents";

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
        return <StyledLoadContainer><CircularProgress disableShrink/></StyledLoadContainer>
    }

    return (
        <>
            {replies.length > 0 ? replies.map(t =>
                <div key={t.id}>
                    <Tweet tweetInfo={t}/>
                </div>) :
                <BoxContainer>
                    <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>{user?.userTag === user_tag ? `You ` : `@${user_tag}`} don`t have any replies yet.</Typography>
                </BoxContainer>
            }
        </>
    );
};

TweetReplies.propTypes = {
    userId: PropTypes.number
}

export default TweetReplies;