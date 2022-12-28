import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import PropTypes from "prop-types";

import {styled} from "@mui/material/styles";
import {BackgroundContext} from "../../../utils/context";

const DontHavAnAccount = ({question, to, link}) => {
  const {background} = useContext(BackgroundContext);

  return (
    <TypographyWrapper variant='body1'>
      {question}
      <Link className='SingUpLink' to={to} state={{background}}>{link}</Link>
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
  question: PropTypes.string,
  to: PropTypes.string,
  link: PropTypes.string,
}

export default DontHavAnAccount;
