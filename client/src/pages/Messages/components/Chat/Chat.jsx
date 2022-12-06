import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import {getChatsData} from '@redux/chats/selector';

const Chat = () => {
  const {selectedChat, isChatSelected, isGroupChat} = useSelector(getChatsData);

  return (
    <BoxWrapper>
      <ChatHeader selectedChat={selectedChat}/>
      {isChatSelected && <ChatBody selectedChat={selectedChat} isGroupChat={isGroupChat}/>}
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const BoxWrapper = styled(Box)(styles);

export default Chat;
