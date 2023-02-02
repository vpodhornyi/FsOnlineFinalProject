import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useInView} from 'react-intersection-observer';
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {moment} from "@utils";
import {setSeenMessage} from '@redux/chat/message/action';
import {PATH} from "@utils/constants";
import Action from "./Action/Action";
// import Reaction from "./Reaction";

const ForeignerMessage = ({chat, message, sameMessage, toggleModal}) => {
  const dispatch = useDispatch();
  const {ref, inView} = useInView({
    threshold: 1.0,
    triggerOnce: true,
  });
  const {isMessageSeen} = message;

  const sendSeen = body => {
    dispatch(setSeenMessage({body}));
  }

  useEffect(() => {
    if (message && inView && !isMessageSeen) {
      const lastMessage = chat.lastMessage;
      sendSeen({messageId: message.id, chatId: message.chatId, countUnreadMessages: lastMessage.countUnreadMessages});
    }
  }, [inView])

  return (
    <BoxWrapper>
      <MessageBox ref={ref}>
        {message.isGroupChat && (sameMessage ?
            <Box sx={{mr: '10px', width: '2.7rem', height: '2.7rem'}}></Box> :
          <Link to={`${PATH.userProfile(message.user.id)}`}>
            <Avatar sx={{mr: '10px', width: '2.7rem', height: '2.7rem'}} src={message.user.avatarImgUrl}/>
          </Link>
        )}
        <MessageTextBox className={`${sameMessage && 'SameMessageTextBox'}`}>
          <Typography>{message.text}</Typography>
        </MessageTextBox>
        <Action toggleModal={toggleModal} message={message}/>
      </MessageBox>
      <Box className={`InfoMessageBox ${sameMessage && 'SameMessage'}`}>
        {/*<Reaction/>*/}
        <TimeBox>
          <Typography variant='body3'>{moment(message.createdAt).fromNow(true)}</Typography>
        </TimeBox>
      </Box>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  alignItems: 'start',

  '& .MuiTypography-root': {
    alignItems: 'start',
  },

  '& .InfoMessageBox': {
    marginTop: 5,
    marginBottom: 10,
  },

  '& .SameMessage': {
    display: 'none',
  },

  '& .SameMessageTextBox': {
    borderBottomLeftRadius: 24,
  },
}));

const MessageBox = styled(Box)(({theme}) => ({
  cursor: 'pointer',
  width: '87.5%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  '&:hover .Actions': {
    opacity: 1
  },
}))

const MessageTextBox = styled(Box)(({theme}) => ({
  flexShrink: 1,
  padding: '11px 15px',
  borderRadius: 24,
  borderBottomLeftRadius: 4,
  backgroundColor: theme.palette.background[2],
  color: theme.palette.text.primary,

  '& .MuiTypography-root': {
    wordWrap: 'break-word',
    minWidth: 0,
  }
}));

const TimeBox = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  fontFamily: theme.typography.fontFamily
}));

ForeignerMessage.propTypes = {
  chat: PropTypes.object,
  message: PropTypes.object,
  toggleModal: PropTypes.func,
  sameMessage: PropTypes.bool,
}
export default ForeignerMessage;
