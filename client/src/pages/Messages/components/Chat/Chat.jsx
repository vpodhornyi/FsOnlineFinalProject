import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useRoutes, Navigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatHeader from "./Header";
import {getMessageData} from "@redux/message/selector";
import Loading from "@components/Loader/Loading";
import ChatBody from "./ChatBody";
import {getMessages} from "../../../../redux/message/action";


const Chat = () => {
  const dispatch = useDispatch();
  const {chat} = useSelector(getMessageData);
  const {isDetailLoading} = useSelector(getMessageData);
  const [{messages}, setMessages] = useState({messages: []});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await dispatch(getMessages(chat?.id));
      setMessages({messages: [...messages, ...data]});
      setFetching(false);
    }
    fetch();
  }, []);

  return (
    <BoxWrapper>
      <ChatHeader/>
      {isDetailLoading ?
        <Box sx={{height: '100%'}}>
          <Loading/>
        </Box>
        : <ChatBody messages={messages}/>}
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
