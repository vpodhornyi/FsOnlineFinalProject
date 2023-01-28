import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import {Avatar, Typography, Box, Badge} from "@mui/material";
import PropTypes from "prop-types";

import {ACTIONS} from '@redux/chat/action';
import More from './More';
import {PATH} from "@utils/constants";
import {moment} from "@utils";

const ChatRoute = ({chat, toggleModal}) => {
  const {authUser} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const handleChatClick = (chat) => {
    dispatch(ACTIONS.setChatId({chatId: chat?.id}));
    navigate(PATH.MESSAGES.chat(chat?.id));
  }

  const getText = (text) => {
    const ln = text?.length;
    return ln && ln > 30 ? text.slice(0, 30) + '...' : text;
  }

  return (
    <BoxWrapper onClick={() => handleChatClick(chat)}>
      <Box
        className={id && (id == chat.id) ? `ChatRoutWrapperActive` : chat?.lastMessage?.countUnreadMessages ? 'NotReadMessagesExist' : ''}>
        <Box sx={{display: 'flex'}}>
          <Avatar sx={{mr: '10px', width: '3.3rem', height: '3.3rem'}} src={chat.avatarImgUrl}/>
          <Box>
            <Box sx={{display: 'flex'}}>
              <Typography sx={{fontWeight: 600}}>{chat.title}</Typography>

              {chat.isPrivate && <Typography variant='body2' sx={{ml: '5px'}}>@{chat.userTag}</Typography>}
              {chat?.lastMessage &&
                <Typography variant='body2' sx={{
                  '&:before': {
                    content: '"·"',
                    marginLeft: '5px',
                    marginRight: '5px',
                  }
                }}>{moment(chat?.lastMessage?.createdAt).fromNow(true)}</Typography>
              }
            </Box>
            <Box sx={{display: 'flex'}}>
              {authUser?.id !== chat?.lastMessage?.user.id && chat?.lastMessage?.user.name &&
                <Typography variant='body2' sx={{mr: 1}}>{chat?.lastMessage?.user.name}:</Typography>}
              <Typography variant='body2'>{getText(chat?.lastMessage?.text)}</Typography>
            </Box>
          </Box>
        </Box>
        <Badge
          badgeContent={chat?.lastMessage?.countUnreadMessages}
          color="primary"
          max={99}
          // variant="dot"
        >
          <Box className='MoreIcon'>
            <More toggleModal={toggleModal} chat={chat}/>
          </Box>
        </Badge>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  position: 'relative',
  marginBottom: 2,

  '& .MuiBadge-badge': {
    color: theme.palette.common.white
  },

  '& .ChatRoutWrapperActive': {
    backgroundColor: theme.palette.background[2],
    borderRight: `2px ${theme.palette.primary.main} solid`,
  },

  '& > .NotReadMessagesExist': {
    backgroundColor: theme.palette.background[1],
  },

  '& > .MuiBox-root': {
    position: 'relative',
    padding: '14px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.background[1],
    },

    '& .MoreIcon': {
      opacity: 1,

      position: 'absolute',
      top: '5px',
      right: '5px',
      zIndex: 998,

      [theme.breakpoints.up('xs')]: {
        opacity: 0,
      }
    },

    '&:hover  .MoreIcon': {
      opacity: 1,
    }
  }
}));

ChatRoute.propTypes = {
  chat: PropTypes.object,
  toggleModal: PropTypes.func,
}

export default ChatRoute;
