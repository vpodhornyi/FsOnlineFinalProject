import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

import StartMessage from "./footer/StartMessage";
import UserInfo from "./UserInfo";
import Message from "./Message";
import ScrollDownButton from "./ScrollDownButton";
import {CircularLoader} from "../../../../components";
import {getMessages} from "@redux/chats/messages/action";

const debounce = (callback, delay) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

const ChatBody = ({chatId, isGroupChat}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [{messages}, setMessages] = useState({messages: []});
  const overlayRef = useRef();
  const chatBodyRef = useRef();
  const {user: {id: authUserId}} = useSelector(state => state.user);

  const onBottom = () => {
    const heightBody = chatBodyRef?.current?.offsetHeight;
    overlayRef?.current?.scroll(0, heightBody);
  }

  useEffect(() => {
    const fetch = async () => {
      setMessages({messages: []});
      setLoading(true);
      const messages = await dispatch(getMessages(chatId));
      setMessages({messages});
      setLoading(false);
      setTimeout(() => {
        onBottom();
      }, 300)
    }
    fetch();
  }, [chatId]);

  const showScrollDownButton = debounce(setVisible, 500);

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
      <Box onClick={onBottom}>
        {visible && <ScrollDownButton visible={visible}/>}
      </Box>
      <StartMessage onBottom={onBottom}/>
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
    scrollBehavior: 'smooth',
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
