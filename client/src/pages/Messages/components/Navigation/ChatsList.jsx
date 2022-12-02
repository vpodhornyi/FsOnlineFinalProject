import React, {Suspense, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {getMessageData} from '@redux/message/selector';
import {CircularLoader} from "../../../../components";
import {PATH} from "../../../../utils/constants";
import ChatRoute from "./ChatRoute";
import {getChats} from "../../../../redux/message/action";

const ChatsList = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [{chats}, setChats] = useState({chats: []});
  const {activeId, isChatSelected} = useSelector(getMessageData);
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    const fetch = async () => {
      const data = await dispatch(getChats(user?.id));
      setChats({chats: [...chats, ...data]});
    }
    fetch();
  }, []);

  useEffect(() => {
    isChatSelected && navigate(`${PATH.MESSAGES.ROOT}/${activeId}`)
  }, []);

  const handleChatClick = () => {
    navigate(`${PATH.MESSAGES.ROOT}/${chat.id}`)
  }

  return (
    <Suspense fallback={CircularLoader}>
      <Box>
        {chats.map(chat => {
          return <Box
            key={chat.key}
            onClick={() => handleChatClick()}>
            <ChatRoute chat={chat} activeId={activeId}/>
          </Box>
        })}
      </Box>
    </Suspense>
  );
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',

});

const BoxWrapper = styled(Box)(styles);

ChatsList.propTypes = {
  item: PropTypes.object,
}
export default ChatsList;
