import React from "react";
import PropTypes from "prop-types";

import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import Seen from "./Seen";
import Reaction from "./Reaction";
import Action from "./Action/Action";
import {moment} from "@utils";

const MessageOwner = ({message, toggleModal}) => {
  return (
    <BoxWrapper>
      <MessageBox>
        <Action toggleModal={toggleModal}/>
        <MessageTextBox>
          <Typography>{message.text}</Typography>
        </MessageTextBox>
      </MessageBox>
      {/*<Reaction/>*/}
      <TimeBox>
        <Typography variant='body3'>{moment(message.createdAt).fromNow(true)}</Typography>
        <Seen message={message}/>
      </TimeBox>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  paddingBottom: 10,
  alignItems: 'end',
}));

const MessageBox = styled(Box)(({theme}) => ({
  cursor: 'pointer',
  width: '87.5%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: 5,

  '&:hover .Actions': {
    opacity: 1
  },
}))

const MessageTextBox = styled(Box)(({theme}) => ({
  flexShrink: 1,
  padding: '11px 15px',
  borderRadius: 24,
  borderBottomRightRadius: 4,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,

  '& .MuiTypography-root': {
    wordWrap: 'break-word',
    minWidth: 0,
  }
}));

const TimeBox = styled(Box)(({theme}) => ({
  display: 'flex'
}));

MessageOwner.propTypes = {
  message: PropTypes.object,
  toggleModal: PropTypes.func,
}
export default MessageOwner;
