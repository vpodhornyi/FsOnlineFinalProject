import React from "react";
import {styled} from "@mui/material/styles";


const StyledSection = styled('section')(({theme}) => ({
  height: '100%',
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    borderLeft: `1px solid ${theme.palette.border.main}`,
    borderRight: `1px solid ${theme.palette.border.main}`,
  },


  [theme.breakpoints.up('md')]: {
    width: 320,
  },

  [theme.breakpoints.up('lg')]: {
    width: 390,
  },
}));

export default StyledSection;
