import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useDebouncedCallback} from 'use-debounce';
import {scroller} from 'react-scroll';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";


import StartMessage from "./StartMessage";
import {useModal} from "../../../../hooks/useModal";
import UserInfo from "./UserInfo";
import ScrollDownButton from "./ScrollDownButton";
import {CircularLoader, ModalWindow} from "../../../../components";
import {ACTIONS as CHAT_ACTIONS, addNewPrivateChat, addNewGroupChat} from "@redux/chat/action";
import {ACTIONS as MESSAGE_ACTIONS, getMessages, sendMessage} from "@redux/chat/message/action";
import {getChatsData, getMessagesData} from "@redux/chat/selector";
import {CHAT_TYPE} from '@utils/constants';
import {PATH} from "@utils/constants";
import {getRandomKey} from "@utils";
import MessageOwner from "./Message/MessageOwner";
import ForeignerMessage from "./Message/ForeignerMessage";
import LeaveChatMessage from "./Message/LeaveChatMessage";
import AddNewUsersMessage from "./Message/AddNewUsersMessage";
import UnreadMessagesNotification from "./Message/UnreadMessagesNotification";
import MessageViewElement from "./MessageViewElement";
import ChatHeader from "./ChatHeader";

const ChatBody = ({chatId}) => {
  const {modal, toggleModal} = useModal();
  const {NEW_PRIVATE, NEW_GROUP} = CHAT_TYPE;
  const overlayRef = useRef();
  const chatBodyRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedChat} = useSelector(getChatsData);
  const {messages, pageSize, pageNumberUp, pageNumberDown, totalPages} = useSelector(getMessagesData);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUp, setLoadingUp] = useState(false);
  const [loadingDown, setLoadingDown] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [activeMessageId, setActiveMessageId] = useState(0);
  const [lastSeenChatMessageId, setLastSeenChatMessageId] = useState(0);

  const fetch = useDebouncedCallback(async (id, pageNumber) => {
    if (selectedChat) {
      setLoading(true);
      const data = await dispatch(getMessages({
        chatId: id, pageNumber, pageSize, up: true, down: true,
      }));
      setLoading(false);
      setTimeout(() => {
        const {lastSeenChatMessageId} = data;
        setLastSeenChatMessageId(lastSeenChatMessageId);
        onElement(lastSeenChatMessageId);
      }, 300);
    }
  }, 500);

  useEffect(() => {
    dispatch(MESSAGE_ACTIONS.resetMessages());
    const countUnreadMessages = selectedChat?.lastMessage?.countUnreadMessages || 0;
    const pageNumber = countUnreadMessages === 0 ? 0 : Math.floor((countUnreadMessages - 1) / pageSize);
    setPageNumber(pageNumber)
    fetch(chatId, pageNumber);
  }, [chatId]);

  const send = async (textMessage) => {
    if (textMessage.trim() !== '') {
      dispatch(CHAT_ACTIONS.setMessage({chatId, text: ''}));
      const type = selectedChat.type;

      if (type === NEW_PRIVATE) {
        const newChatId = await dispatch(addNewPrivateChat(selectedChat, textMessage));
        navigate(PATH.MESSAGES.chat(newChatId));
        return;
      }

      if (type === NEW_GROUP) {
        const newChatId = await dispatch(addNewGroupChat(selectedChat, textMessage));
        navigate(PATH.MESSAGES.chat(newChatId));
        return;
      }
      const newMessage = {
        chatId, key: getRandomKey(), text: textMessage, isMessageOwner: true, sending: true,
      };

      if (selectedChat.isPrivate || type === NEW_PRIVATE) {
        newMessage.isPrivateChat = true
        newMessage.isMessageSeen = false
      }

      if (selectedChat.isGroup || type === NEW_GROUP) {
        newMessage.isGroupChat = true
        newMessage.messagesSeen = [];
      }
      await dispatch(MESSAGE_ACTIONS.addNewMessage(newMessage));
      onBottom();
      await dispatch(sendMessage(newMessage));
      inputRef.current.focus();
    }
  }

  const onElement = (name) => {
    scroller.scrollTo(`elementName${name}`, {
      containerId: 'ScrollContainer'
    })
  }

  const onBottom = () => {
    if (pageNumberDown === 0) {
      scroller.scrollTo('elementNameBottom', {
        containerId: 'ScrollContainer'
      })
    }
  }

  const toggleElementVisible = async (inView, id) => {
    if (inView) {
      if (messages[0]?.id === id && pageNumberUp < totalPages - 1) {
        setLoadingUp(true);
        const data = await dispatch(getMessages({
          chatId, pageNumber: pageNumberUp + 1, pageSize, up: true,
        }))
        setLoadingUp(false);
        const messages = data.messages;
        if (pageNumberUp > pageNumber && messages?.length) {
          onElement(messages[messages.length - 1]?.id);
        }
      }

      if (pageNumberDown && messages[messages.length - 1]?.id === id) {
        setLoadingDown(true);
        await dispatch(getMessages({
          chatId, pageNumber: pageNumberDown - 1, pageSize, down: true,
        }))
        setLoadingDown(false);
      }
    }
  }

  const toggleBottomVisible = (inView) => {
    setVisible(!inView);
  }

  const messageBoxClick = (id) => {
    setActiveMessageId(activeMessageId === id ? 0 : id);
  }

  const showMessage = (m, i) => {
    let message = null;
    let notification = null;
    if (m.isMessageOwner) {
      message = <MessageViewElement
        key={m?.key}
        toggleVisible={toggleElementVisible}
        message={m}
        toggleModal={toggleModal}
        element={MessageOwner}
        chat={selectedChat}
        messageBoxClick={messageBoxClick}
        nextMessage={messages[i + 1]}
        activeMessageId={activeMessageId}
      />
    }

    if (m.isForeignerMessage) {
      message = <MessageViewElement
        key={m?.key}
        toggleVisible={toggleElementVisible}
        message={m}
        toggleModal={toggleModal}
        element={ForeignerMessage}
        chat={selectedChat}
        messageBoxClick={messageBoxClick}
        nextMessage={messages[i + 1]}
      />
    }

    if ((m.id === lastSeenChatMessageId) && messages.length - 1 !== i && !messages[i + 1]?.isMessageOwner) {
      notification = <UnreadMessagesNotification key={getRandomKey()}/>
    }


    switch (true) {
      case m.isLeaveChat: {
        return <LeaveChatMessage
          key={m?.key}
          item={m}
        />
      }
      case m.isAddNewUsers: {
        return <AddNewUsersMessage
          key={m?.key}
          item={m}
        />
      }
    }
    return <Box key={message.key}>
      {message}
      {notification}
    </Box>
  }

  return (<BoxWrapper>
    <Box
      id='ScrollContainer'
      className='ScrollContainer'
      ref={overlayRef}
    >
      <Box
        ref={chatBodyRef}
        className='MessagesBox'>
        {selectedChat.isPrivate && <UserInfo/>}
        {loading ? (<Box sx={{position: 'relative', pt: 3, pb: 3}}>
          <CircularLoader/>
        </Box>) : <Box sx={{padding: '5px 0'}}>
          {loadingUp ? (<Box sx={{position: 'relative', pt: 2, pb: 2}}>
            <CircularLoader size={20}/>
          </Box>) : null}
          {messages?.map(showMessage)}
          <MessageViewElement toggleVisible={toggleBottomVisible} message={{id: 'Bottom'}}/>
          {loadingDown ? (<Box sx={{position: 'relative', pt: 2, pb: 2}}>
            <CircularLoader size={20}/>
          </Box>) : null}
        </Box>}
      </Box>
    </Box>
    <Box sx={{position: 'relative', zIndex: 1000,}}>
      <Box onClick={onBottom}>
        <ScrollDownButton
          pageNumberDown={pageNumberDown}
          getLastPage={fetch}
          visible={visible}
          chat={selectedChat}/>
      </Box>
      <StartMessage
        inputRef={inputRef}
        chatId={chatId}
        sendMessage={send}
      />
    </Box>
    <ModalWindow
      isShowing={modal.isShowing}
      toggleModal={toggleModal}
      element={modal.element}/>
  </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 55px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& .ScrollContainer': {
    overflow: 'auto', paddingLeft: 15, paddingRight: 15,
  },

  '@keyframes fadein': {
    from: {opacity: 0}, to: {opacity: 1}
  },

  '& .ScrollDownButton': {
    animation: 'fadein 0.4s',
  }
}));

ChatBody.propTypes = {
  chatId: PropTypes.number,
}

export default ChatBody;
