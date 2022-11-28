import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";

import {PATH} from "../../../utils/constants";
import {styled} from "@mui/material/styles";
import {BackgroundContext} from "../../../utils/context";

const DontHavAnAccount = () => {
  const {background} = useContext(BackgroundContext);

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

export default DontHavAnAccount;
