import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar, Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {ACTIONS as MESSAGE_ACTIONS} from "@redux/message/action";
import {getCurrentChat, getMessageData} from "@redux/message/selector";
import {StickyHeader} from '../../../../components';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentChat = useSelector(getCurrentChat);
  const {activeId} = useSelector(getMessageData);

  return (
    <StyledStickyHeader>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{mr: '10px'}} className='backButton' onClick={() => dispatch(MESSAGE_ACTIONS.resetActiveId())}>
          <CustomIconButton name='ArrowBackOutlined' title='Back'/>
        </Box>
        <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={currentChat.avatarImgUrl}/>
        <Typography variant='h2'>{currentChat.title}</Typography>
      </Box>
      <Box onClick={() => navigate(`/messages/${activeId}/info`)}>
        <CustomIconButton name='InfoOutlined' title='Details'/>
      </Box>
    </StyledStickyHeader>);
}

const styles = ({theme}) => ({
  padding: '0 15px',
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

const StyledStickyHeader = styled(StickyHeader)(styles);

export default Header;
