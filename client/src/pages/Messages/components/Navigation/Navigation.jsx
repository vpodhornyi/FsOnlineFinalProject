import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {getChatsData} from '@redux/chats/selector';
import ChatRoute from "./ChatRoute";
import {getChats} from "@redux/chats/action";
import ActionWelcome from "./ActionWelcome";
import SearchBox from "./SearchBox";
import {CircularLoader} from "../../../../components";

const Navigation = () => {
  const dispatch = useDispatch();
  const {user: {id: userId}} = useSelector(state => state.user);
  const {isChatLoading, isChatsExist, chats} = useSelector(getChatsData);

  useEffect(() => {
    const fetch = async () => {
      dispatch(getChats(userId));
    }
    fetch();
  }, []);

  if (isChatLoading && !isChatsExist) return (
    <Box sx={{height: '100%', position: 'relative'}}>
      <CircularLoader/>
    </Box>
  );

  if (isChatsExist) return (
    <Box>
      <SearchBox/>
      {chats.map(chat => <ChatRoute key={chat.key} chat={chat}/>)}
    </Box>
  )

  return <ActionWelcome/>;
}

Navigation.propTypes = {
  user: PropTypes.object,
}

export default Navigation;
