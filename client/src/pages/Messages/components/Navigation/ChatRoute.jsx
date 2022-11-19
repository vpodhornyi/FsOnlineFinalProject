import React from "react";
import {useDispatch} from 'react-redux';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {getConversation} from "@redux/message/action";
import More from './More';

const ChatRoute = ({chat, activeId}) => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper
      onClick={() => dispatch(getConversation({id: chat.id}))}
      sx={activeId !== -1 && activeId === chat.id ? {
        backgroundColor: 'rgb(239, 243, 244)',
        borderRight: '2px blue solid',
      } : {}}>
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
      <Box className='MoreIcon' sx={{
        display: 'none',
        position: 'absolute',
        top: '5px',
        right: '5px',
        zIndex: 1000,
      }}>
        {/*<CustomIconButton name='MoreHorizOutlined' title='More'/>*/}
        <More/>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  position: 'relative',
  padding: '14px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: 'rgb(247, 249, 249)'
  },

  '&:hover > .MoreIcon': {
    display: 'block'
  }
});

const BoxWrapper = styled(Box)(styles);

ChatRoute.propTypes = {
  chat: PropTypes.object,
  activeId: PropTypes.number,
}

export default ChatRoute;
