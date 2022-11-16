import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar, Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {openChatInfo, resetActiveId} from "@redux/message/action";
import {getMessageData} from "@redux/message/selector";

const Header = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();
  const {user} = useSelector(getMessageData);

  return (
    <BoxWrapper>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{mr: '10px'}} className='backButton' onClick={() => dispatch(resetActiveId())}>
          <CustomIconButton name='ArrowBackOutlined' title='Back'/>
        </Box>
        <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={user.avatarImgUrl}/>
        <Typography variant='h2'>{user.name}</Typography>
      </Box>
      <Box onClick={() => dispatch(openChatInfo())}>
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

export default Header;
