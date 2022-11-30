import React from "react";
import {styled} from "@mui/material/styles";

export default styled('div')(({theme}) => ({
  width: '100%',
  height: '100%',
  borderLeft: '1px solid #DDDFE2',
  borderRight: '1px solid #DDDFE2',

  [theme.breakpoints.up('sm')]: {
    width: 600,
  },
}));
