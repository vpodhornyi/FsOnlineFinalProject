import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

import {PATH} from "../../utils/constants";
import {CustomIconButton} from "../../components";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <BoxWrapper>
      <Typography className='HeaderTitle' variant='h2'>Messages</Typography>
      <Box onClick={() => navigate(PATH.MESSAGES.COMPOSE, {state: {background: location}})}>
        <CustomIconButton name='ForwardToInboxOutlined' title='New message' color='text'/>
      </Box>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export default Header;
