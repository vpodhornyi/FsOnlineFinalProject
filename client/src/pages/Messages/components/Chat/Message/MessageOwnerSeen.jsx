import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {CustomIconButton} from "@components";
import {ACTIONS, getPrivateChatByUsersId} from "@redux/chat/action";
import {PATH} from "@utils/constants";
import {CHAT_TYPE} from '@utils/constants';
import {getRandomKey} from '@utils';

const MessageOwnerSeen = ({user}) => {
  const {NEW_PRIVATE} = CHAT_TYPE;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.stopPropagation();
    const entity = {

      key: getRandomKey(),
      type: NEW_PRIVATE,
      isNew: true,
    }
    const id = Date.now();
    const chat = await dispatch(getPrivateChatByUsersId({guestUserId: user.id}));

    if (chat?.id) {
      dispatch(ACTIONS.addExistChat({chat}));
      navigate(PATH.MESSAGES.chat(chat.id));
    } else {
      entity.id = id;
      entity.guestUserId = user.id;
      entity.title = user.name;
      entity.userTag = user.userTag;
      entity.avatarImgUrl = user.avatarImgUrl;
      dispatch(ACTIONS.addNewPrivateChat(entity));
      dispatch(ACTIONS.setChatId({chatId: id}));
      navigate(PATH.MESSAGES.chat(id));
    }
  }

  return (
    <BoxWrapper onClick={() => navigate(`${PATH.userProfile(user.userTag)}`)}>
      <Avatar sx={{mr: '10px', width: '3.3rem', height: '3.3rem'}} src={user.avatarImgUrl}/>
      <Box sx={{display: 'flex', flexDirection: 'column', mr: 3}}>
        <Typography sx={{fontWeight: 600}}>{user.name}</Typography>
        <Typography variant='body2'>@{user.userTag}</Typography>
      </Box>
      <Box onClick={e => handleClick(e)}>
        <CustomIconButton
          color='greyAccent'
          name='EmailOutlined'
          title='More'
          size='small'
        />
      </Box>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',


  '& .CustomIconButtonWrapper': {
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: '30px',
  },

  '& .MuiButtonBase-root:hover': {
    backgroundColor: 'rgba(15, 20, 25, 0.1) !important',
  }
}));

MessageOwnerSeen.propTypes = {
  user: PropTypes.object,
}

export default MessageOwnerSeen;
