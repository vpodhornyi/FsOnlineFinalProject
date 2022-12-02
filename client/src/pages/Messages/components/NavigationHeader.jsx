import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";

import {PATH} from "../../../utils/constants";
import {CustomIconButton, StickyHeader} from "../../../components";

const NavigationHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledStickyHeader>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <StyledAvatar/>
        <Typography className='MessageTitle' variant='h2'>Messages</Typography>
      </Box>
      <Box onClick={() => navigate(PATH.MESSAGES.COMPOSE, {state: {background: location}})}>
        <CustomIconButton name='ForwardToInboxOutlined' title='New message'/>
      </Box>
    </StyledStickyHeader>
  );
}

const StyledAvatar = styled(Avatar)(({theme}) => ({
  cursor: 'pointer',
  marginRight: 10,
  width: '2.5rem',
  height: '2.5rem',

  [theme.breakpoints.up('xs')]: {
    display: 'none'
  },
}));

const StyledStickyHeader = styled(StickyHeader)(({theme}) => ({
  padding: '10px 14px',

  '& .MessageTitle': {
    fontSize: '1.3rem',
    fontWeight: 600
  }
}));

export default NavigationHeader;
