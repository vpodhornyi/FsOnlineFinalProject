import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useDebouncedCallback} from 'use-debounce';
import {useInView} from 'react-intersection-observer';
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import Action from "./Action/Action";
import {moment} from "@utils";
import {ACTIONS, setSeenMessage} from '@redux/chat/message/action';

const ForeignerMessage = ({message, toggleModal, onBottom}) => {
  const dispatch = useDispatch();
  const {ref, inView} = useInView({
    threshold: 1.0,
    triggerOnce: true,
  });
  const {authUser: {id: authUserId}} = useSelector(state => state.user);
  const {isMessageSeen} = message;
  const sendSeen = useDebouncedCallback(data => dispatch(setSeenMessage(data)), 300);

  useEffect(() => {
    if (message && inView && !isMessageSeen) {
      dispatch(ACTIONS.updateForeignerMessageSeen(message))
      sendSeen({messageId: message.id, userId: authUserId, chatId: message.chatId});
    }
  }, [inView])

  return (
    <BoxWrapper>
      <MessageBox ref={ref}>
        <MessageTextBox>
          <Typography>{message.text}</Typography>
        </MessageTextBox>
        <Action toggleModal={toggleModal}/>
      </MessageBox>
      {/*<Reaction/>*/}
      <TimeBox>
        <Typography variant='body3'>{moment(message.createdAt).fromNow(true)}</Typography>
      </TimeBox>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  paddingBottom: 10,
  alignItems: 'start',

  '& .MuiTypography-root': {
    alignItems: 'start',
  }
}));

const MessageBox = styled(Box)(({theme}) => ({
  cursor: 'pointer',
  width: '87.5%',
  display: 'flex',
  justifyContent: 'flex-start',
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
  borderBottomLeftRadius: 4,
  backgroundColor: '#eff3f4',
  color: theme.palette.text.primary,

  '& .MuiTypography-root': {
    wordWrap: 'break-word',
    minWidth: 0,
  }
}));

const TimeBox = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center'
}));

ForeignerMessage.propTypes = {
  message: PropTypes.object,
  toggleModal: PropTypes.func,
  onBottom: PropTypes.func,
}
export default ForeignerMessage;
