import React from "react";
import {styled} from "@mui/material/styles";

const StyledSection = styled('section')(({theme}) => ({
  display: 'none',
  borderRight: '1px solid rgb(239, 243, 244)',
  flexGrow: 1,
  height: '100vh',
  position: 'sticky',
  top: 0,

  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: 'auto'
  }
}));

export default StyledSection;
