import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar, Typography, AvatarGroup} from "@mui/material";
import PropTypes from "prop-types";

import CustomIconButton from "@components/buttons/CustomIconButton";
import {StickyHeader} from '@components';
import {PATH} from "@utils/constants";
import {ACTIONS} from '@redux/chat/action';

const ChatHeader = ({chat}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const handleClick = () => {
  navigate(PATH.MESSAGES.ROOT);
  dispatch(ACTIONS.resetChatId());
}
  return (
    <StyledStickyHeader>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box
          className='backButton'
          sx={{mr: '10px'}}
          onClick={handleClick}>
          <CustomIconButton name='ArrowBackOutlined' title='Back'/>
        </Box>
        {
          chat.isGroup &&
          <Link to={`${PATH.MESSAGES.participants(chat?.id)}`}>
            <AvatarGroup max={5}>
              {
                chat.users.map(user => <Avatar key={user.key} src={user.avatarImgUrl}/>)
              }
            </AvatarGroup>
          </Link>
        }
        {
          chat.isPrivate &&
          <Link className='PrivateChatAvatar' to={`${PATH.userProfile(chat?.guestUser?.userTag)}`}>
            <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={chat?.avatarImgUrl}/>
          </Link>
        }
        <Typography sx={{ml: 2}} variant='h2'>{chat?.title}</Typography>
      </Box>
      <Box onClick={() => navigate(PATH.MESSAGES.chatInfo(chat?.id))}>
        <CustomIconButton name='InfoOutlined' title='Details'/>
      </Box>
    </StyledStickyHeader>);
}

const StyledStickyHeader = styled(StickyHeader)(({theme}) => ({
  '& .MuiAvatarGroup-root .MuiAvatar-root': {
    border: '2px solid #ffffff',
    width: '2.5rem',
    height: '2.5rem'
  },

  '& .PrivateChatAvatar': {
    padding: '2px',
  },

  padding: '6px 15px',
  '.avatarWrapper': {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },

  '& .MuiTypography-root': {
    fontSize: '1.3rem',
    fontWeight: theme.typography.fontWeightBold
  },

  '& .backButton': {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  }
}));

ChatHeader.propTypes = {
  chat: PropTypes.object,
}

export default ChatHeader;
