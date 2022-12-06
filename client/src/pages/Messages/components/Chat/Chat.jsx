import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import {getChatsData} from '@redux/chats/selector';
import {ACTIONS} from '@redux/chats/action';
import {PATH} from "../../../../utils/constants";

const Chat = () => {
  const {isGroupChat, selectedChat, chats} = useSelector(getChatsData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    try {
      const chatId = parseInt(id);
      const chat = chats.find(v => v.id === chatId);
      if (chat) {
        dispatch(ACTIONS.setChatId({chatId}))
      } else {
        navigate(PATH.MESSAGES.ROOT);
      }
    } catch (e) {
      navigate(PATH.MESSAGES.ROOT);
    }
  }, []);

  return (
    <BoxWrapper>
      <ChatHeader selectedChat={selectedChat}/>
      <ChatBody chatId={parseInt(id)} isGroupChat={isGroupChat}/>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export default Chat;
