import React from "react";
import PropTypes from "prop-types";

import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import Seen from "./Seen";
// import Reaction from "./Reaction";
import Action from "./Action/Action";
import {moment} from "@utils";

const MessageOwner = ({message, toggleModal, messageBoxClick, sameMessage, activeMessageId}) => {
  const active = message.id === activeMessageId;

  return (
    <BoxWrapper>
      <MessageBox onClick={() => messageBoxClick(message?.id)}>
        <Action toggleModal={toggleModal} message={message} isRight={true}/>
        <MessageTextBox
          className={`${sameMessage ? 'SameMessageTextBox' : null} ${active ? 'SameMessageTextBoxActive' : null}`}>
          <Typography>{message.text}</Typography>
        </MessageTextBox>
      </MessageBox>
      <Box className={`InfoMessageBox ${sameMessage && !active && 'SameMessage'}`}>
        {/*<Reaction/>*/}
        <TimeBox>
          <Typography variant='body3'>{moment(message.createdAt).fromNow(true)}</Typography>
          <Seen message={message}/>
        </TimeBox>
      </Box>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  alignItems: 'end',

  '& .InfoMessageBox': {
    marginTop: 5,
    marginBottom: 10,
  },

  '& .SameMessage': {
    display: 'none',
  },

  '& .SameMessageTextBox': {
    borderBottomRightRadius: 24,
  },

  '& .SameMessageTextBoxActive': {
    backgroundColor: theme.palette.primary.secondary,
  }
}));

const MessageBox = styled(Box)(({theme}) => ({
  cursor: 'pointer',
  width: '87.5%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

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

  '&:hover': {
    backgroundColor: theme.palette.primary.secondary,
  },

  '& .MuiTypography-root': {
    wordWrap: 'break-word',
    minWidth: 0,
    color: theme.palette.common.textWhite,
  }
}));

const TimeBox = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  fontFamily: theme.typography.fontFamily
}));

MessageOwner.propTypes = {
  message: PropTypes.object,
  toggleModal: PropTypes.func,
  messageBoxClick: PropTypes.func,
  sameMessage: PropTypes.bool,
  activeMessageId: PropTypes.number,
}
export default MessageOwner;
