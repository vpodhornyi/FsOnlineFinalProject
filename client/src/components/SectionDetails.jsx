import React from "react";
import {styled} from "@mui/material/styles";

const StyledSection = styled('section')(({theme}) => ({
  display: 'none',
  flexGrow: 1,
  height: '100vh',
  position: 'sticky',
  top: 0,

  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.border.main}`,
  },

  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: 'auto'
  }
}));

export default StyledSection;
