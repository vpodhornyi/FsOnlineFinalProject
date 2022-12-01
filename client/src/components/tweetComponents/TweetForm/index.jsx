import React, { useRef, useState } from "react";
import { Avatar, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
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

import { createTweet } from "../../../redux/tweet/action";
import { getPersonalData } from "../../../redux/user/selector";
import { getTweetsState } from "../../../redux/tweet/selector";
import { closeModal } from "../../../redux/modal/action";

export const TweetForm = ({
  placeholderText = `What's happening?`,
  tweetType = "TWEET",
}) => {
  const [tweetText, setTweetText] = useState("");
  const [isEmojiVisible, setEmojiVisible] = useState(false);
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
    return event.target.files && event.target.files[0];
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
          {showReplyText && placeholderText !== "Tweet your reply" && (
            <ReplyText>
              <PublicIcon fontSize={"small"} style={{ paddingRight: 10 }} />{" "}
              Everyone can reply
            </ReplyText>
          )}
        </TweetInput>
        <FormFooter>
          <IconsList>
            <Icon>
              <ImageIcon onClick={handleFileUploadClick} />
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleUploadFile}
              />
            </Icon>
            <Icon>
              <GifIcon />
            </Icon>
            <Icon>
              <PollIcon />
            </Icon>
            <Icon>
              <EmojiIcon onClick={onEmojiVisible} />
              {isEmojiVisible && (
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                />
              )}
            </Icon>
            <Icon>
              <ScheduleIcon />
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
