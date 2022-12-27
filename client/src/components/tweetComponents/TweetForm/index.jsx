import React, {useRef, useState} from "react";
import {Avatar, Box, Input, TextareaAutosize} from "@mui/material";
import {useNavigate} from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import EmojiPicker from "emoji-picker-react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import { CircularProgress } from '@mui/material';
import {
    EmojiIcon,
    GifIcon,
    ImageIcon,
    PollIcon,
    ScheduleIcon,
} from "../../../media/icons";
import {
    AvatarContainer,
    Form,
    FormFooter,
    Icon,
    IconsList,
    ReplyText, TextCount,
    TweetBtn,
    TweetInput,
    TwitterContainer,
} from "./styles";

import {createTweet} from "../../../redux/tweet/action";
import {getPersonalData} from "../../../redux/user/selector";
import ImageListContainer from "../../imageList/ImageListContainer";
import {uploadImage} from "../../../utils/uploadImage";

export const TweetForm = ({
                              placeholderText = `What's happening?`,
                              tweetType = "TWEET",
                          }) => {
    const [tweetText, setTweetText] = useState("");
    const [isEmojiVisible, setEmojiVisible] = useState(false);
    const [uploadPhotos, setUploadPhotos] = useState([]);
    const inputRef = useRef(null);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [showReplyText, setShowReplyText] = useState(false);
    const user = useSelector(getPersonalData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const TWEET_TEXT_INTEREST  = tweetText.length/(250/100);
    const LETTER_COUNTER_COMP =
        TWEET_TEXT_INTEREST <= 100 ?
            <CircularProgress size={"30px"} variant="determinate" value={TWEET_TEXT_INTEREST}/>
            : <TextCount sx={{color: "red"}}>{-(tweetText.length - 250)}</TextCount>

    const onEmojiVisible = (bool) => {
        setEmojiVisible((prevState) => typeof bool === "boolean" ? bool : !prevState);
    };

    const onEmojiClick = (emojiData, event) => {
        setSelectedEmoji(emojiData.emoji);

            setTweetText(`${tweetText} ${selectedEmoji}`);


    };
    const handleUploadFile = (event) => {
        uploadImage(event.target.files[0], user.id, "TWEET").then(res => {
                res.status && setUploadPhotos((prev) => [...prev, res.url])
            }
        )
    };

    const handleFileUploadClick = () => {
        inputRef.current.click();
    };

    const onInputChange = (event) => {
            setTweetText(event.target.value);

    };

    const onInputFocus = () => {
        setShowReplyText(true);
    };

    const onSubmit = () => {
        const newTweet = {
            tweetType,
            body: tweetText,
            images: uploadPhotos,
            user,
        };
        setTweetText("");
        setUploadPhotos([])
        onEmojiVisible(false)
            {tweetType==="REPLY"&& navigate(-1) }
        dispatch(createTweet(newTweet));
    };

    return (
        <TwitterContainer>
            <AvatarContainer>
                <Avatar src={user?.avatarImgUrl} onClick={() => navigate(`/${user?.userTag}`)}>
                    {user?.name?.toUpperCase()}
                </Avatar>
            </AvatarContainer>
            <Form>
                <TweetInput>
                    <TextareaAutosize
                        maxRows={3}
                        style={{resize: "none", width: "100%", outline: "white", fontSize: "16px", border: "none"}}
                        onFocus={onInputFocus}
                        type={"text"}
                        placeholder={placeholderText}
                        value={tweetText}
                        onChange={onInputChange}
                    />
                    {uploadPhotos.length > 0 && <ImageListContainer photos={uploadPhotos}/>}
                    {showReplyText && placeholderText !== "Tweet your reply" && (
                        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <ReplyText>
                                <PublicIcon fontSize={"small"} style={{paddingRight: 10}}/>{" "}
                                Everyone can reply
                            </ReplyText>

                        </Box>
                    )}
                </TweetInput>
                <FormFooter>
                    <IconsList>
                        <Icon disabled={uploadPhotos.length >= 4}>
                            <ImageIcon onClick={handleFileUploadClick}/>
                            <input
                                style={{display: "none"}}
                                ref={inputRef}
                                type="file"
                                disabled={uploadPhotos.length >= 4}
                                onChange={handleUploadFile}
                            />
                        </Icon>
                        <Icon>
                            <GifIcon/>
                        </Icon>
                        <Icon>
                            <PollIcon/>
                        </Icon>
                        <Icon>
                            <EmojiIcon onClick={() => onEmojiVisible()}/>

                        </Icon>
                        <Icon>
                            <ScheduleIcon/>
                        </Icon>
                    </IconsList>
                    {isEmojiVisible && (
                        <Box sx={{
                            position: "absolute",
                            zIndex: 1,
                            top: "50px"
                        }}><EmojiPicker
                            sx={{
                                height: "450px",
                                width: "350px",
                                overflow: "visible",
                                top: "163px",
                                zIndex: 1
                            }}
                            onEmojiClick={onEmojiClick}
                            autoFocusSearch={false}
                        /></Box>
                    )}
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>{LETTER_COUNTER_COMP}
                        <TweetBtn disabled={TWEET_TEXT_INTEREST > 100} onClick={onSubmit}>{tweetType}</TweetBtn></Box>
                </FormFooter>
            </Form>
        </TwitterContainer>
    );
};

TweetForm.propTypes = {
    tweetType: PropTypes.string,
    placeholderText: PropTypes.string,
};
