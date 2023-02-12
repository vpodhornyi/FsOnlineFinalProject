import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {IconByName, ModalPage, TweetForm} from "../../index";
import IconButton from "@mui/material/IconButton";
import {PATH} from "../../../utils/constants";
import {BackgroundContext} from "../../../utils/context";
import TweetReply from "../TweetReply";
import {useDispatch, useSelector} from "react-redux";
import {getRepliesState, getTweetsState} from "../../../redux/tweet/selector";
import api, {URLS} from "../../../services/API";

const Reply = () => {
    const {background} = useContext(BackgroundContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [tweetInfo, setTweetInfo] = useState(null)
    useEffect(() => {
        (async function () {
            setTweetInfo(await api.get(URLS.TWEET.getTweet(id)))
        }());
    }, []);

    return (
        <>{tweetInfo && <ModalPage
            styles={{alignItems: "start"}}
            element={
                <BoxWrapper>
                    <IconButton
                        className="Close"
                        aria-label="close"
                        onClick={() => navigate(background?.pathname || PATH.ROOT)}
                    >
                        <IconByName iconName="Close"/>
                    </IconButton>
                    <TweetReply tweetInfo={tweetInfo}/>
                    <TweetForm
                        placeholderText={"Tweet your reply"}
                        tweetType={"REPLY"}
                        parentTweetId={id}
                    />
                </BoxWrapper>
            }
        />}</>
    );
};

const BoxWrapper = styled(Box)(({theme}) => ({
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.common.white,
    padding: "40px 0",
    position: "relative",

    [theme.breakpoints.up("sm")]: {
        width: "600px",
        borderRadius: 16,
        marginTop: 80,
    },

    "& .Close": {
        position: "absolute",
        top: 5,
        left: 5,
    },
}));

export default Reply;
