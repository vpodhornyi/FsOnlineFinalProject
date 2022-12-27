import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {useInView} from 'react-intersection-observer';
import {useDebouncedCallback} from 'use-debounce';

import MessageBox from "./MessageBox";
import Reaction from "./Reaction";
import Time from "./Time";
import {setSeenMessage} from '@redux/chat/action';

const Message = ({message, toggleModal, onBottom}) => {
  const {ref, inView} = useInView({
    threshold: 1.0,
    triggerOnce: true,
  });
  const dispatch = useDispatch();
  const {authUser: {id: authUserId}} = useSelector(state => state.user)
  const {isPrivateChat, messageSeen, isMessageOwner} = message;
  const sendSeen = useDebouncedCallback(data => dispatch(setSeenMessage(data)), 300);

  useEffect(() => {
    onBottom();
    if (message && inView && !isMessageOwner && !messageSeen) {
      sendSeen({messageId: message.id, userId: authUserId, chatId: message.chatId});
    }
  }, [inView])

  return (
    <BoxWrapper>
      <Box className={isMessageOwner ? 'RightMessage' : 'LeftMessage'}>
        {/*{inView && (message?.messageSeen?.seen === false) &&  'Seen'}*/}
        <Box ref={ref}>
          <MessageBox left={!isMessageOwner} text={message?.text} toggleModal={toggleModal}/>
        </Box>
        {/*<Reaction/>*/}
        <Time left={!isMessageOwner} message={message}/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& > .MuiBox-root': {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingBottom: 5,
    alignItems: 'end',
  },

  '& > .MuiBox-root > .MuiBox-root': {
    display: 'flex',

    '&:hover .Actions': {
      opacity: 1
    }
  },

  '& > .RightMessage > .MuiBox-root': {
    justifyContent: 'flex-end',
  },

  '& > .LeftMessage > .MuiBox-root': {
    justifyContent: 'flex-start',
    width: '100%'
  },
  '& > .LeftMessage > .MuiBox-root > .MuiBox-root': {
    justifyContent: 'flex-start',
  },
}));

Message.propTypes = {
  message: PropTypes.object,
  toggleModal: PropTypes.func,
  onBottom: PropTypes.func,
}

export default Message;
