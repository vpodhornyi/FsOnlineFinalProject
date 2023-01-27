
import React, {useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {IconByName, TweetForm} from "../../index";

import {ModalPage} from '../../index';
import IconButton from "@mui/material/IconButton";
import {PATH} from "../../../utils/constants";
import {BackgroundContext} from "../../../utils/context";
import TweetReply from "../TweetReply";
import {useSelector} from "react-redux";
import {getTweetsState} from "../../../redux/tweet/selector";


const Reply = () => {
    const {background} = useContext(BackgroundContext);
    const navigate = useNavigate();
    const tweets = useSelector(getTweetsState);
    const {id}=useParams();
    const tweetInfo = tweets.find(el=>el.id===+id)
    return (
        <ModalPage
            styles={{alignItems: 'start'}}
            element={
                <BoxWrapper>
                    <IconButton
                        className='Close'
                        aria-label="close"
                        onClick={() => navigate(background?.pathname || PATH.ROOT)}>
                        <IconByName iconName='Close'/>
                    </IconButton>
                    <TweetReply tweetInfo={tweetInfo} />
                    <TweetForm placeholderText={"Tweet your reply"} tweetType={"REPLY"} />
                </BoxWrapper>
            }/>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.common.textWhite,
    padding: '40px 0',
    position: 'relative',

    [theme.breakpoints.up('sm')]: {
        width: '600px',
        borderRadius: 16,
        marginTop: 80,
    },

    '& .Close': {
        position: 'absolute',
        top: 5,
        left: 5,
    },
}));

export default Reply;
