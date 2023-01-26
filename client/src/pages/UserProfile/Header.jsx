import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const Header = ({user}) => {

  return (
    <BoxWrapper>
      <Typography className='HeaderTitle' variant='h2'>{user.name}</Typography>
      <Typography variant='body2'>0 Tweets</Typography>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

Header.propTypes = {
  user: PropTypes.object,
}
export default Header;
