import React from "react";
import {Link} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {PATH} from "../../../utils/constants";
import {styled} from "@mui/material/styles";

const DontHavAnAccount = ({background}) => {
  return (
    <TypographyWrapper className='SingUpTitle' variant='body1'>
      {"Don't have an account?"}
      <Link className='SingUpLink' to={PATH.SING_UP} state={{background}}>Sign up</Link>
    </TypographyWrapper>
  );
}

const TypographyWrapper = styled(Typography)(({theme}) => ({
  margin: "10px 0",

  '& .SingUpLink': {
    marginLeft: '10px',
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}));

DontHavAnAccount.propTypes = {
  background: PropTypes.object,
}
export default DontHavAnAccount;
