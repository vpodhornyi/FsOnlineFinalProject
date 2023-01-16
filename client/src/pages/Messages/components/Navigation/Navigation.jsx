import React, {useEffect, useState} from "react";
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
import InViewElement from "../InViewElement";

const Navigation = () => {
  const {modal, toggleModal} = useModal();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {isChatLoading, isChatsExist, chats, totalPages, pageNumber} = useSelector(getChatsData);

  const fetch = async () => {
    await dispatch(getChats());
  }

  useEffect(() => {
    fetch();
  }, []);

  if (isChatLoading && !isChatsExist) return (
    <Box sx={{height: '100%', position: 'relative'}}>
      <CircularLoader/>
    </Box>
  );

  const toggleVisible = async (inView) => {
    if (inView && (pageNumber < totalPages - 1)) {
      setLoading(true);
      await fetch();
      setLoading(false);
    }
  }

  if (isChatsExist) return (
    <Box>
      <SearchBox/>
      {chats.map(chat => <ChatRoute key={chat.key} chat={chat} toggleModal={toggleModal}/>)}
      {!loading && <InViewElement toggleVisible={toggleVisible}/>}
      {loading && (<Box sx={{position: 'relative', pt: 1, pb: 1}}>
        <CircularLoader/>
      </Box>)}
      <ModalWindow
        isShowing={modal.isShowing}
        toggleModal={toggleModal}
        element={modal.element}
      />
    </Box>
  )
  return <ActionWelcome/>;
}

Navigation.propTypes = {
  user: PropTypes.object,
}

export default Navigation;
