import React, { useRef, useState } from "react";
import { Avatar, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import EmojiPicker from "emoji-picker-react";
import {
  EmojiIcon,
  GifIcon,
  ImageIcon,
  PollIcon,
  ScheduleIcon,
} from "../../media/icons";
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
import PropTypes from "prop-types";

export const TweetForm = (props) => {
  const [tweetText, setTweetText] = useState("");
  const [isEmojiVisible, setEmojiVisible] = useState(false);
  const inputRef = useRef(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showReplyText, setShowReplyText] = useState(false);

  const { buttonText, placeholderText = `What's happening?` } = props;
  const navigate = useNavigate();
  const onHandleAvatarClick = () => {
    navigate("/profile");
  };

  const onEmojiVisible = () => {
    setEmojiVisible((prevState) => !prevState);
  };

  const onEmojiClick = (emojiData, event) => {
    setSelectedEmoji(emojiData.emoji);
    console.log(selectedEmoji);
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

  const onSubmit = () => {};

  return (
    <TwitterContainer>
      <AvatarContainer>
        <Avatar src={"#"} onClick={onHandleAvatarClick} />
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
          <TweetBtn onClick={onSubmit}>{buttonText}</TweetBtn>
        </FormFooter>
      </Form>
    </TwitterContainer>
  );
};

TweetForm.propTypes = {
  buttonText: PropTypes.string,
  placeholderText: PropTypes.string,
};
