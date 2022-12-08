import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {useDebouncedCallback} from 'use-debounce';
import PropTypes from "prop-types";

import StartMessage from "./footer/StartMessage";
import UserInfo from "./UserInfo";
import Message from "./Message";
import ScrollDownButton from "./ScrollDownButton";
import {CircularLoader} from "../../../../components";
import {ACTIONS, getMessages, sendMessage, addNewChat} from "@redux/chat/action";
import {getChatsData} from "@redux/chat/selector";
import {CHAT_TYPE} from '@utils/constants';

const ChatBody = ({chatId, isGroupChat}) => {
  const {NEW_GROUP, NEW_PRIVATE} = CHAT_TYPE;
  const overlayRef = useRef();
  const chatBodyRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const {message, selectedChat} = useSelector(getChatsData);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [{messages}, setMessages] = useState({messages: []});
  const {user: {id: authUserId}} = useSelector(state => state.user);
  const showScrollDownButton = useDebouncedCallback(v => setVisible(v), 300);
  const fetch = useDebouncedCallback(async (id) => {
    setMessages({messages: []});
    setLoading(true);
    const messages = await dispatch(getMessages(id));
    setMessages({messages});
    setLoading(false);
    setTimeout(() => {
      onBottom();
    }, 300)
  }, 500);

  const onBottom = () => {
    const heightBody = chatBodyRef?.current?.offsetHeight;
    overlayRef?.current?.scroll(0, heightBody);
  }

  useEffect(() => {
    fetch(chatId);
  }, [chatId]);


  const onScrollEvent = () => {
    const scroll = overlayRef?.current?.scrollTop;
    const offsetHeight = overlayRef?.current?.offsetHeight;
    const scrollHeight = overlayRef?.current?.scrollHeight;
    const maxScroll = scrollHeight - offsetHeight;

    if (scroll < maxScroll) {
      showScrollDownButton(true);
    } else if (scroll === maxScroll) {
      showScrollDownButton(false);
    }
  }

  const send = async () => {
    if (message.trim() !== '') {
      setSending(true);
      dispatch(ACTIONS.setMessage({chatId, text: ''}));
      const type = selectedChat.type;

      if (type === NEW_GROUP || type === NEW_PRIVATE) {
        const data = await dispatch(addNewChat(selectedChat));

      } else {
        const data = await dispatch(sendMessage({chatId, text: message}));
        if (data?.id) {
          messages.push(data);
          setMessages({messages});
        }
      }
      inputRef.current.focus();
      setTimeout(() => {
        onBottom();
        setSending(false);
      }, 500)
    }
  }

  const enterKeyDown = (e) => {
    if (e.keyCode === 13) {
      send();
    }
  }

  return (
    <BoxWrapper>
      <Box ref={overlayRef} className='Overlay' onScroll={onScrollEvent}>
        <Box ref={chatBodyRef} className='MessagesBox'>
          {!isGroupChat && <UserInfo/>}
          {loading && (
            <Box sx={{position: 'relative', pt: 3, pb: 3}}>
              <CircularLoader/>
            </Box>
          )}
          {messages.map(item => {
            const isAuth = item?.user?.id === authUserId;
            return <Message key={item?.key} left={!isAuth} text={item?.text}/>
          })}
        </Box>
      </Box>
      <Box sx={{position: 'relative'}}>
        <Box onClick={onBottom}>
          {visible && <ScrollDownButton visible={visible}/>}
        </Box>
        <StartMessage
          sending={sending}
          chatId={chatId}
          message={message}
          inputRef={inputRef}
          sendMessage={send}
          enterKeyDown={enterKeyDown}
          onBottom={onBottom}/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  height: 'calc(100% - 37px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& > .Overlay': {
    overflow: 'overlay',
    overflowX: 'hidden',
    paddingRight: 15,
    // scrollBehavior: 'smooth',
  },

  '& > .MuiBox-root > .MessagesBox': {
    overflow: 'overlay',
    paddingLeft: 15,
    paddingRight: 15,
  },

  '@keyframes fadein': {
    from: {opacity: 0},
    to: {opacity: 1}
  },

  '& .ScrollDownButton': {
    animation: 'fadein 0.5s',
  }
}));

ChatBody.propTypes = {
  chatId: PropTypes.number,
  selectedChat: PropTypes.object,
  isGroupChat: PropTypes.bool,
}

export default ChatBody;
