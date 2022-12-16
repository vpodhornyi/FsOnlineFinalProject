import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {getChatsData} from '@redux/chat/selector';
import ChatRoute from "./ChatRoute";
import {ACTIONS, getChats} from "@redux/chat/action";
import ActionWelcome from "./ActionWelcome";
import SearchBox from "./SearchBox";
import {CircularLoader} from "../../../../components";
import {ModalWindow} from "../../../../components";
import {useModal} from '../../../../hooks/useModal';
import LeaveChatConfirm from "../confirms/LeaveChatConfirm";

const Navigation = () => {
  const {isShowing, toggle} = useModal();
  const dispatch = useDispatch();
  const {authUser: {id: userId}} = useSelector(state => state.user);
  const {isChatLoading, isChatsExist, chats, pageNumber, pageSize} = useSelector(getChatsData);

  useEffect(() => {
    const fetch = async () => {
      if (pageNumber === 0) {
        dispatch(getChats({userId, pageNumber, pageSize}));
        dispatch(ACTIONS.setPageNumber({pageNumber: pageNumber + 1}));
      }
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
      {chats.map(chat => <ChatRoute key={chat.key} chat={chat} openModal={toggle}/>)}
      <ModalWindow
        isShowing={isShowing}
        modalClose={toggle}
        element={<LeaveChatConfirm modalClose={toggle}/>}
      />
    </Box>
  )

  return <ActionWelcome/>;
}

Navigation.propTypes = {
  user: PropTypes.object,
}

export default Navigation;
