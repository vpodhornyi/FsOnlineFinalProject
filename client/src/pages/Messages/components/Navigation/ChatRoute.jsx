import React from "react";
import {useDispatch} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import {Avatar, Typography, Box} from "@mui/material";
import PropTypes from "prop-types";

import {ACTIONS} from '@redux/chat/action';
import More from './More';
import {PATH} from "@utils/constants";

const ChatRoute = ({chat}) => {
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
          <Avatar sx={{mr: '10px', width: '3rem', height: '3rem'}} src={chat.avatarImgUrl}/>
          <Box>
            <Box sx={{display: 'flex'}}>
              <Typography sx={{fontWeight: 600}}>{chat.title}</Typography>
              <Typography sx={{ml: '5px'}}>{chat.userTag}</Typography>
              <Typography sx={{
                '&:before': {
                  content: '"·"',
                  marginLeft: '5px',
                  marginRight: '5px',
                }
              }}>{'1h'}</Typography>
            </Box>
            <Box sx={{display: 'flex'}}>
              <Box><Typography>You reacted with {':-)'}:</Typography></Box>
              <Box><Typography>{' message text'}</Typography></Box>
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
