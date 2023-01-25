import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate, Outlet} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import {getChatsData} from '@redux/chat/selector';
import {ACTIONS} from '@redux/chat/action';
import {PATH} from "@utils/constants";

const Chat = () => {
  const {selectedChat, chats} = useSelector(getChatsData);
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
  }, [id]);

  return (
    <BoxWrapper>
      <OutletWrapper>
        <Outlet/>
      </OutletWrapper>
      <ChatHeader chat={selectedChat}/>
      <ChatBody chatId={parseInt(id)}/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}));
const OutletWrapper = styled(Box)(({theme}) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 1299,
}));

export default Chat;
