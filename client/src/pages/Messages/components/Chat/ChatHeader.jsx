import React from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar, Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {StickyHeader} from '../../../../components';
import PropTypes from "prop-types";;

const ChatHeader = ({selectedChat}) => {
  const navigate = useNavigate();

  return (
    <StyledStickyHeader>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{mr: '10px'}} className='backButton' onClick={() => navigate(-1)}>
          <CustomIconButton name='ArrowBackOutlined' title='Back'/>
        </Box>
        <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={'/'}/>
        <Typography variant='h2'>{selectedChat?.title}</Typography>
      </Box>
      <Box>
        <CustomIconButton name='InfoOutlined' title='Details'/>
      </Box>
    </StyledStickyHeader>);
}

const StyledStickyHeader = styled(StickyHeader)(({theme}) => ({
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
}));

ChatHeader.propTypes = {
  selectedChat: PropTypes.object,
}

export default ChatHeader;
