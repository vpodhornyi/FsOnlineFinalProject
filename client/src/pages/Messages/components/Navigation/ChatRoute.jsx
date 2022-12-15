import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import {Avatar, Typography, Box} from "@mui/material";
import PropTypes from "prop-types";

import {ACTIONS} from '@redux/chat/action';
import More from './More';
import {PATH} from "@utils/constants";
import {CHAT_TYPE} from "@utils/constants";
import {moment} from "@utils";

const ChatRoute = ({chat}) => {
  const {authUser} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const handleChatClick = (chat) => {
    dispatch(ACTIONS.setChatId({chatId: chat?.id}));
    navigate(`${PATH.MESSAGES.ROOT}/${chat?.id}`);
  }

  return (
    <BoxWrapper onClick={() => handleChatClick(chat)}>
      <Box className={id && (id == chat.id) ? `ChatRoutWrapperActive` : ''}>
        <Box sx={{display: 'flex'}}>
          <Avatar sx={{mr: '10px', width: '3.3rem', height: '3.3rem'}} src={chat.avatarImgUrl}/>
          <Box>
            <Box sx={{display: 'flex'}}>
              <Typography sx={{fontWeight: 600}}>{chat.title}</Typography>

              {chat.isPrivate && <Typography variant='body2' sx={{ml: '5px'}}>@{chat.userTag}</Typography>}
              <Typography variant='body2' sx={{
                '&:before': {
                  content: '"·"',
                  marginLeft: '5px',
                  marginRight: '5px',
                }
              }}>{moment(chat?.lastMessage?.createdAt).fromNow(true)}</Typography>
            </Box>
            <Box sx={{display: 'flex'}}>
              {authUser?.id !== chat?.lastMessage?.user.id && chat?.lastMessage?.user.name &&
                <Typography variant='body2' sx={{mr: 1}}>{chat?.lastMessage?.user.name}:</Typography>}
              {/*<Box><Typography>You reacted with {':-)'}:</Typography></Box>*/}
              <Typography variant='body2'>{chat?.lastMessage?.text}</Typography>
            </Box>
          </Box>
        </Box>
        <Box className='MoreIcon'>
          <More/>
        </Box>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  position: 'relative',

  '& .ChatRoutWrapperActive': {
    backgroundColor: 'rgb(239, 243, 244)',
    borderRight: `2px ${theme.palette.primary.main} solid`,
  },

  '& > .MuiBox-root': {
    position: 'relative',
    padding: '14px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    cursor: 'pointer',


    '&:hover': {
      backgroundColor: 'rgb(247, 249, 249)'
    },

    '& .MoreIcon': {
      display: 'none',
      position: 'absolute',
      top: '5px',
      right: '5px',
      zIndex: 1000,
    },

    '&:hover > .MoreIcon': {
      display: 'block'
    }
  }
});

const BoxWrapper = styled(Box)(styles);

ChatRoute.propTypes = {
  chat: PropTypes.object,
}

export default ChatRoute;
