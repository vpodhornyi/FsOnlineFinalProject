import React from "react";
import {useSelector} from 'react-redux';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

import ChatInfoHeader from "./ChatInfoHeader";
import Notifications from "./Notifications";
import Person from "./Person";
import GroupPeople from "./GroupPeople";
import GroupEdit from "./GroupEdit";
import {getChatsData} from '@redux/chat/selector';

const ChatInfo = () => {
  const {selectedChat} = useSelector(getChatsData);
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
  display: 'flex',
  flexDirection: 'column'
}));

export default ChatInfo;
