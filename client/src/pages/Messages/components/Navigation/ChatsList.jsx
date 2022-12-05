import React, {Suspense, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {getMessageData} from '@redux/message/selector';
import ChatRoute from "./ChatRoute";
import {getChats, getMessages} from "../../../../redux/message/action";
import {ActionWelcome} from "../.";
import SearchBox from "./SearchBox";
import {PATH} from "../../../../utils/constants";
import {CircularLoader} from "../../../../components";

const ChatsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user: {id: userId}} = useSelector(state => state.user);
  const {chat: {id}, isChatLoading, chats, isChatsExist} = useSelector(getMessageData);

  useEffect(() => {
    dispatch(getChats(userId))
  }, []);

  if (isChatLoading && !isChatsExist) return (
    <BoxWrapper>
      <CircularLoader/>
    </BoxWrapper>
  );

  if (isChatsExist) return (
    <Box>
      <SearchBox/>
      {chats.map(chat => <ChatRoute key={chat.key} chat={chat}/>)}
    </Box>
  )

  return <ActionWelcome/>;
}

const BoxWrapper = styled(Box)(({theme}) => ({
  height: '100%',
  position: 'relative'
}));

ChatsList.propTypes = {
  user: PropTypes.object,
}

export default ChatsList;
