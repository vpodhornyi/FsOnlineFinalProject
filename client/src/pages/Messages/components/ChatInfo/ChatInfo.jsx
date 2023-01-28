import React, {useEffect} from "react";
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

import ChatInfoHeader from "./ChatInfoHeader";
import Notifications from "./Notifications";
import Person from "./Person";
import GroupPeople from "./GroupPeople";
import GroupEdit from "./GroupEdit";
import {getChatsData} from '@redux/chat/selector';
import {PATH} from "@utils/constants";

const ChatInfo = () => {
  const navigate = useNavigate();
  const {selectedChat} = useSelector(getChatsData);

  useEffect(() => {
    if (!selectedChat.id) navigate(PATH.MESSAGES.ROOT);
  }, [])

  return (
    <StyledBox>
      <ChatInfoHeader chat={selectedChat}/>
      {selectedChat.isPrivate && <Person user={selectedChat?.guestUser}/>}
      {selectedChat.isGroup &&
        <>
          <GroupEdit chat={selectedChat}/>
          <GroupPeople chat={selectedChat}/>
        </>
      }
      <Notifications chat={selectedChat}/>
    </StyledBox>);
}

const StyledBox = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.main,
}));

export default ChatInfo;
