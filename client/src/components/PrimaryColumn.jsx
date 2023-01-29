import React from "react";
import {styled} from "@mui/material/styles";

export default styled('div')(({theme}) => ({
  width: '100%',
  height: '100%',

  [theme.breakpoints.up('sm')]: {
    width: 600,
    borderLeft: `1px solid ${theme.palette.border.main}`,
    borderRight: `1px solid ${theme.palette.border.main}`,
  },
}));
