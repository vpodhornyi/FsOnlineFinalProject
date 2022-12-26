import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useDebouncedCallback} from 'use-debounce';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";


import StartMessage from "./StartMessage";
import UserInfo from "./UserInfo";
import Message from "./Message/Message";
import ScrollDownButton from "./ScrollDownButton";
import {CircularLoader, ModalWindow} from "../../../../components";
import {ACTIONS, getMessages, sendMessage, addNewPrivateChat, addNewGroupChat} from "@redux/chat/action";
import {getChatsData} from "@redux/chat/selector";
import {CHAT_TYPE} from '@utils/constants';
import {PATH} from "@utils/constants";
import DeleteMessageConfirm from "../confirms/DeleteMessageConfirm";


const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};
const ChatBody = ({chatId}) => {
  const {isShowing, toggle} = useModal();
  const {NEW_PRIVATE, NEW_GROUP, PRIVATE} = CHAT_TYPE;
  const overlayRef = useRef();
  const chatBodyRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedChat, messages} = useSelector(getChatsData);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {authUser: {id: authUserId}} = useSelector(state => state.user);
  const showScrollDownButton = useDebouncedCallback(v => setVisible(v), 300);


  const getScrolling = () => {
    const offsetHeight = overlayRef?.current?.offsetHeight;
    const scrollHeight = overlayRef?.current?.scrollHeight;
    if (offsetHeight === scrollHeight) {
      showScrollDownButton(false);
    }
  }

  const fetch = useDebouncedCallback(async (id) => {
    setLoading(true);
    await dispatch(getMessages(id));
    setLoading(false);
    setTimeout(() => {
      getScrolling();
      onBottom();
    }, 200);
  }, 500);

  useEffect(() => {
    dispatch(ACTIONS.resetMessages());
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

  const send = async (textMessage) => {
    if (textMessage.trim() !== '') {
      dispatch(ACTIONS.setMessage({chatId, text: ''}));
      const type = selectedChat.type;

      if (type === NEW_PRIVATE) {
        const newChatId = await dispatch(addNewPrivateChat(selectedChat));
        navigate(PATH.MESSAGES.chat(newChatId));
        return;
      }

      if (type === NEW_GROUP) {
        const newChatId = await dispatch(addNewGroupChat(selectedChat));
        navigate(PATH.MESSAGES.chat(newChatId));
        return;
      }
      await dispatch(sendMessage({
        chatId,
        text: textMessage,
        isPrivateChat: selectedChat.isPrivate,
        isGroupChat: selectedChat.isGroup,
      }));

      inputRef.current.focus();
      onBottom();
    }
  }

  const onBottom = () => {
    const heightBody = chatBodyRef?.current?.offsetHeight;
    overlayRef?.current?.scroll(0, heightBody);
  }

  return (
    <BoxWrapper>
      <Box
        ref={overlayRef}
        sx={{
          overflowX: 'hidden',
        }}
        onScroll={onScrollEvent}>
        <Box
          ref={chatBodyRef}
          className='MessagesBox'>
          {selectedChat.type === PRIVATE && <UserInfo/>}
          {loading && (
            <Box sx={{position: 'relative', pt: 3, pb: 3}}>
              <CircularLoader/>
            </Box>
          )}
          {messages.map(item => {
            const isAuth = item?.user?.id === authUserId;
            return <Message
              key={item?.key}
              left={!isAuth}
              message={item}
              toggleModal={toggle}/>
          })}
        </Box>
      </Box>
      <Box sx={{position: 'relative'}}>
        <Box onClick={onBottom}>
          {visible && <ScrollDownButton visible={visible}/>}
        </Box>
        <StartMessage
          inputRef={inputRef}
          chatId={chatId}
          sendMessage={send}
        />
      </Box>
      <ModalWindow
        isShowing={isShowing}
        toggleModal={toggle}
        element={<DeleteMessageConfirm toggleModal={toggle}/>}/>
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
    animation: 'fadein 0.4s',
  }
}));

ChatBody.propTypes = {
  chatId: PropTypes.number,
}

export default ChatBody;
