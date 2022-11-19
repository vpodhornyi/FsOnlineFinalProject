import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar, Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {ACTIONS as MESSAGE_ACTIONS} from "@redux/message/action";
import {getCurrentChat} from "@redux/message/selector";

const Header = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector(getCurrentChat);

  return (
    <BoxWrapper>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{mr: '10px'}} className='backButton' onClick={() => dispatch(MESSAGE_ACTIONS.resetActiveId())}>
          <CustomIconButton name='ArrowBackOutlined' title='Back'/>
        </Box>
        <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={currentChat.avatarImgUrl}/>
        <Typography variant='h2'>{currentChat.title}</Typography>
      </Box>
      <Box onClick={() => dispatch(MESSAGE_ACTIONS.openChatInfo())}>
        <CustomIconButton name='InfoOutlined' title='Details'/>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(255,255,255, 0.9)',

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
});

const BoxWrapper = styled(Box)(styles);

export default Header;
