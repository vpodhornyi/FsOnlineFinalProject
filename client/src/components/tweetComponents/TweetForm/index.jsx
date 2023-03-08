import React, { useContext, useRef, useState } from "react";
import { Avatar, Box, TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import { EmojiIcon, ImageIcon } from "../../../media/icons";
import {
  AvatarContainer,
  Form,
  FormFooter,
  Icon,
  IconsList,
  ReplyText,
  TextCount,
  TweetBtn,
  TweetInput,
  TwitterContainer,
} from "./styles";

import { createTweet } from "../../../redux/tweet/action";
import {
  getCustomizationTheme,
  getPersonalData,
} from "../../../redux/user/selector";
import ImageListContainer from "../../imageList/ImageListContainer";
import { uploadImage } from "../../../utils/uploadImage";
import { BackgroundContext } from "../../../utils/context";
import { BACKGROUND, COLOR } from "../../../utils/theme";

export const TweetForm = ({
  placeholderText = `What's happening?`,
  tweetType = "Tweet",
  parentTweetId = null,
}) => {
  const [tweetText, setTweetText] = useState("");
  const [isEmojiVisible, setEmojiVisible] = useState(false);
  const [uploadPhotos, setUploadPhotos] = useState([]);
  const inputRef = useRef(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showReplyText, setShowReplyText] = useState(false);
  const user = useSelector(getPersonalData);
  const theme = useSelector(getCustomizationTheme);
  const navigate = useNavigate();
  const { background } = useContext(BackgroundContext);
  const dispatch = useDispatch();
  const TWEET_TEXT_INTEREST = tweetText.length / (250 / 100);
  const LETTER_COUNTER_COMP =
    TWEET_TEXT_INTEREST <= 100 ? (
      <CircularProgress
        size={"30px"}
        variant="determinate"
        value={TWEET_TEXT_INTEREST}
      />
    ) : (
      <TextCount sx={{ color: "red" }}>{-(tweetText.length - 250)}</TextCount>
    );
  const onEmojiVisible = (bool) => {
    setEmojiVisible((prevState) =>
      typeof bool === "boolean" ? bool : !prevState
    );
  };

  const onEmojiClick = (emojiData, event) => {
    setSelectedEmoji(emojiData.emoji);

    setTweetText(`${tweetText} ${selectedEmoji}`);
  };
  const handleUploadFile = (event) => {
    uploadImage(event.target.files[0], user.id, "TWEET").then((res) => {
      res.status && setUploadPhotos((prev) => [...prev, res.url]);
    });
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
      tweetType: tweetType.toUpperCase(),
      body: tweetText,
      images: uploadPhotos,
      user,
      parentTweetId,
    };
    setTweetText("");
    setUploadPhotos([]);
    onEmojiVisible(false);
    navigate(background?.pathname);
    dispatch(createTweet(newTweet));
  };

  return (
    <TwitterContainer>
      <AvatarContainer>
        <Avatar
          src={user?.avatarImgUrl}
          onClick={() => navigate(`/${user?.userTag}`)}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </AvatarContainer>
      <Form>
        <TweetInput>
          <TextareaAutosize
            maxRows={3}
            style={{
              resize: "none",
              width: "100%",
              backgroundColor:
                BACKGROUND[theme?.backgroundColor]?.palette.background.main,
              color: BACKGROUND[theme?.backgroundColor]?.palette.textColor,
              outline: BACKGROUND[theme?.backgroundColor]?.palette.textColor,
              fontSize: "16px",
              border: "none",
            }}
            onFocus={onInputFocus}
            type={"text"}
            placeholder={placeholderText}
            value={tweetText}
            onChange={onInputChange}
          />
          {uploadPhotos.length > 0 && (
            <ImageListContainer photos={uploadPhotos} />
          )}
          {showReplyText && placeholderText !== "Tweet your reply" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ReplyText sx={{ color: COLOR[theme?.color]?.primary.main }}>
                <PublicIcon
                  fontSize={"small"}
                  style={{
                    paddingRight: 10,
                    color: COLOR[theme?.color]?.primary.main,
                  }}
                />{" "}
                Everyone can reply
              </ReplyText>
            </Box>
          )}
        </TweetInput>
        <FormFooter>
          <IconsList>
            <Icon disabled={uploadPhotos.length >= 4}>
              <ImageIcon
                sx={{ cursor: "pointer" }}
                onClick={handleFileUploadClick}
              />
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                disabled={uploadPhotos.length >= 4}
                onChange={handleUploadFile}
              />
            </Icon>
            <Icon>
              <EmojiIcon
                sx={{ cursor: "pointer" }}
                onClick={() => onEmojiVisible()}
              />
            </Icon>
          </IconsList>
          {isEmojiVisible && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 1,
                top: "50px",
              }}
            >
              <EmojiPicker
                sx={{
                  height: "450px",
                  width: "350px",
                  overflow: "visible",
                  top: "163px",
                  zIndex: 1,
                }}
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {LETTER_COUNTER_COMP}
            <TweetBtn
              sx={{
                "&:disabled": {
                  backgroundColor: COLOR[theme?.color]?.primary.light,
                },
              }}
              disabled={
                TWEET_TEXT_INTEREST > 100 ||
                (uploadPhotos.length === 0 && tweetText === "")
              }
              onClick={onSubmit}
            >
              {tweetType}
            </TweetBtn>
          </Box>
        </FormFooter>
      </Form>
    </TwitterContainer>
  );
};

TweetForm.propTypes = {
  tweetType: PropTypes.string,
  placeholderText: PropTypes.string,
  parentTweetId: PropTypes.string,
};
