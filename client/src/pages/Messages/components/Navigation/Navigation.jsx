import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {getChatsData} from '@redux/chats/selector';
import ChatRoute from "./ChatRoute";
import {ACTIONS, getChats} from "@redux/chats/action";
import ActionWelcome from "./ActionWelcome";
import SearchBox from "./SearchBox";
import {PATH} from "../../../../utils/constants";
import {CircularLoader} from "../../../../components";


const setChatIdFromUrl = (location, navigate, dispatch, chats) => {
  const path = location.pathname.split('/');
  if (`/${path[1]}` === PATH.MESSAGES.ROOT) {
    const id = parseInt(path[2]);
    if (id) {
      if (chats.find(v => v.id === id)) {
        dispatch(ACTIONS.setChatId({chatId: id}));
      } else {
        navigate(PATH.MESSAGES.ROOT);
      }
    }
  }
}

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {user: {id: userId}} = useSelector(state => state.user);
  const {isChatLoading, isChatSelected, isChatsExist, chatId, chats} = useSelector(getChatsData);

  useEffect(() => {
    const fetch = async () => {
      isChatSelected && navigate(`${PATH.MESSAGES.ROOT}/${chatId}`);
      const chats = await dispatch(getChats(userId));
      // setChatIdFromUrl(location, navigate, dispatch, chats);
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
