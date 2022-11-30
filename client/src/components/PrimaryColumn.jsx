import React from "react";
import {styled} from "@mui/material/styles";

export default styled('div')(({theme}) => ({
  backgroundColor: '#ff7a00',
  width: '100%',
  height: '100%',

  [theme.breakpoints.up('sm')]: {
    width: 600,
  },
}));

const ColumnsWrapper = styled('div')(({theme}) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('sm')]: {
    flexGrow: 2,
  },

  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
  }
}));
