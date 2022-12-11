import React from "react";
import Tweet from "../Tweet";
import IconButton from "@mui/material/IconButton";

import { CloseIcon } from "../../../media/icons";
import Box from "@mui/material/Box";
import { TweetForm } from "../TweetForm";
import PropTypes from "prop-types";
import Modal from "../../Modal";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../redux/modal/action";
import TweetReply from "../TweetReply";
const Reply = ({ tweetInfo }) => {
  const dispatch = useDispatch();
  return (
    <Modal type={"Reply"}>
      <Box>
        <IconButton aria-label="close" onClick={() => dispatch(closeModal())}>
          <CloseIcon />
        </IconButton>
      </Box>
      <TweetReply tweetInfo={tweetInfo} openReply={true} />
      <TweetForm placeholderText={"Tweet your reply"} tweetType={"REPLY"} />
    </Modal>
  );
};
Reply.propTypes = {
  tweetInfo: PropTypes.object,
};
export default Reply;
