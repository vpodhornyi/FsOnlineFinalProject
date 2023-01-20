import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

const Header = () => {

  return (
    <BoxWrapper>
      <Typography className='HeaderTitle' variant='h2'>Notification</Typography>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

export default Header;
