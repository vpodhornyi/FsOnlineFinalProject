import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useDebouncedCallback} from 'use-debounce';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

import StartMessage from "./footer/StartMessage";
import UserInfo from "./UserInfo";
import Message from "./Message";
import ScrollDownButton from "./ScrollDownButton";
import {CircularLoader} from "../../../../components";
import {ACTIONS, getMessages, sendMessage, addNewPrivateChat, addNewGroupChat} from "@redux/chat/action";
import {getChatsData} from "@redux/chat/selector";
import {CHAT_TYPE} from '@utils/constants';
import {PATH} from "@utils/constants";

const ChatBody = ({chatId}) => {
  const {NEW_PRIVATE, NEW_GROUP, PRIVATE} = CHAT_TYPE;
  const overlayRef = useRef();
  const chatBodyRef = useRef();
  const inputRef = useRef();
  const offsetHeight = overlayRef?.current?.offsetHeight;
  const scrollHeight = overlayRef?.current?.scrollHeight;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {message, selectedChat} = useSelector(getChatsData);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [{messages}, setMessages] = useState({messages: []});
  const {authUser: {id: authUserId}} = useSelector(state => state.user);
  const showScrollDownButton = useDebouncedCallback(v => setVisible(v), 300);
  const fetch = useDebouncedCallback(async (id) => {
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
    if (offsetHeight === scrollHeight) showScrollDownButton(false);
    setMessages({messages: []});
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

      if (type === NEW_PRIVATE) {
        const newChatId = await dispatch(addNewPrivateChat(selectedChat));
        setSending(false);
        return navigate(`${PATH.MESSAGES.ROOT}/${newChatId}`);
      }

      if (type === NEW_GROUP) {
        const newChatId = await dispatch(addNewGroupChat(selectedChat));
        setSending(false);
        return navigate(`${PATH.MESSAGES.ROOT}/${newChatId}`);
      }

      const data = await dispatch(sendMessage({chatId, text: message}));

      if (data?.id) {
        messages.push(data);
        setMessages({messages});
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
          {selectedChat.type === PRIVATE && <UserInfo/>}
          {loading && (
            <Box sx={{position: 'relative', pt: 3, pb: 3}}>
              <CircularLoader/>
            </Box>
          )}
          {messages.map(item => {
            const isAuth = item?.user?.id === authUserId;
            return <Message key={item?.key} left={!isAuth} message={item}/>
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
  height: 'calc(100% - 49px)',
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
}

export default ChatBody;
