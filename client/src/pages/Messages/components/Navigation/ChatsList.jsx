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

const ChatsList = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [{chats}, setChats] = useState({chats: []});
  const [fetching, setFetching] = useState(true);
  const {chat: {id}} = useSelector(getMessageData);

  useEffect(() => {
    const fetch = async () => {
      const data = await dispatch(getChats(user?.id));
      setChats({chats: data});
      setFetching(false);
    }
    fetch();
  }, []);

  useEffect(() => {
    if (id) {
      navigate(`${PATH.MESSAGES.ROOT}/${id}`);
      // dispatch(getMessages(id));
    }
  }, []);

  return chats.length ? (
    <Box>
      <SearchBox/>
      {chats.map(chat => <ChatRoute key={chat.key} chat={chat}/>)}
    </Box>
  ) : (fetching ? <></> : <ActionWelcome/>);
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',

});

const BoxWrapper = styled(Box)(styles);

ChatsList.propTypes = {
  user: PropTypes.object,
}

export default ChatsList;
