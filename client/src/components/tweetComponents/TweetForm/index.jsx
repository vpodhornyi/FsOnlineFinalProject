import React, {useRef, useState} from "react";
import {Avatar, Input} from "@mui/material";
import {useNavigate} from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import EmojiPicker from "emoji-picker-react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

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
    ReplyText,
    TweetBtn,
    TweetInput,
    TwitterContainer,
} from "./styles";

import {createTweet} from "../../../redux/tweet/action";
import {getPersonalData} from "../../../redux/user/selector";
import {getTweetsState} from "../../../redux/tweet/selector";
import {closeModal} from "../../../redux/modal/action";
import api, {URLS} from "../../../services/API";
import CustomImageList from "../../imageList/CustomImageList";
import ImageListContainer from "../../imageList/ImageListContainer";

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
    const tweets = useSelector(getTweetsState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onEmojiVisible = () => {
        setEmojiVisible((prevState) => !prevState);
    };

    const onEmojiClick = (emojiData, event) => {
        setSelectedEmoji(emojiData.emoji);
        setTweetText(`${tweetText} ${selectedEmoji}`);
    };

    const handleUploadFile = (event) => {
        const formData = new FormData();
        formData.append("upload", event.target.files[0]);
        formData.append("entityId", `${1}`);
        formData.append("uploadType", "TWEET");
        api.post(URLS.CLOUD.IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib2IxMjM0IiwiZXhwIjoxNjcwMjg2NzE4LCJ1c2VyVGFnIjoiYm9iMTIzNCJ9.2_rtOJZ7MNtkJThkC45V1QO_wedagSkyYpmn6n7d06eLNNQcVFl8YXKPwYKiMZQBPKn0VvvRNpELl-FkL2-sGg"
            }
        }).then(res => res.status&&setUploadPhotos((prev)=>[...prev,res.url]))
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
        // const curIndex = tweets[tweets.length - 1].id + 1;
        const newTweet = {
            // id: curIndex,
            tweetType,
            body: tweetText,
            user,
        };
        setTweetText("");
        dispatch(createTweet(newTweet));
        dispatch(closeModal());
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
                    <Input
                        onFocus={onInputFocus}
                        type={"text"}
                        disableUnderline={true}
                        fullWidth={true}
                        placeholder={placeholderText}
                        value={tweetText}
                        onChange={onInputChange}
                    />
                    {uploadPhotos.length&&<ImageListContainer photos={uploadPhotos}/>}
                    {showReplyText && placeholderText !== "Tweet your reply" && (
                        <ReplyText>
                            <PublicIcon fontSize={"small"} style={{paddingRight: 10}}/>{" "}
                            Everyone can reply
                        </ReplyText>
                    )}
                </TweetInput>
                <FormFooter>
                    <IconsList>
                        <Icon disabled={uploadPhotos.length>=4}>
                            <ImageIcon  onClick={handleFileUploadClick}/>
                            <input
                                style={{display: "none"}}
                                ref={inputRef}
                                type="file"
                                disabled={uploadPhotos.length>=4}
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
                            <EmojiIcon onClick={onEmojiVisible}/>
                            {isEmojiVisible && (
                                <EmojiPicker
                                    onEmojiClick={onEmojiClick}
                                    autoFocusSearch={false}
                                />
                            )}
                        </Icon>
                        <Icon>
                            <ScheduleIcon/>
                        </Icon>
                    </IconsList>
                    <TweetBtn onClick={onSubmit}>{tweetType}</TweetBtn>
                </FormFooter>
            </Form>
        </TwitterContainer>
    );
};

TweetForm.propTypes = {
    tweetType: PropTypes.string,
    placeholderText: PropTypes.string,
};
