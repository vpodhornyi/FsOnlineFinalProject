import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import StartMessage from "./footer/StartMessage";
import UserInfo from "./UserInfo";
import Message from "./Message";
import ScrollDownButton from "./ScrollDownButton";
import {getMessageData} from "@redux/message/selector";
import PropTypes from "prop-types";
import ChatsList from "../Navigation/ChatsList";

const debounce = (callback, delay) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

const Conversation = ({messages}) => {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef();
  const chatBodyRef = useRef();
  const {user: {id}} = useSelector(state => state.user);

  const onBottom = () => {
    const heightBody = chatBodyRef.current.offsetHeight;
    overlayRef.current.scroll(0, heightBody);
  }

  useEffect(() => {
    console.log('dd');
    onBottom();
  }, []);

  const showScrollDownButton = debounce(setVisible, 500);

  const onScrollEvent = () => {
    const scroll = overlayRef.current.scrollTop;
    const offsetHeight = overlayRef.current.offsetHeight;
    const scrollHeight = overlayRef.current.scrollHeight;
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
          <UserInfo/>
          {messages.map(item => {
            const isAuth = item?.user?.id === id;

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

const styles = ({theme}) => ({
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
});

const BoxWrapper = styled(Box)(styles);

Conversation.propTypes = {
  messages: PropTypes.array,
}

export default Conversation;
