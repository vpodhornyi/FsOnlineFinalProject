import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";


export default styled(Box)(({theme}) => ({
  position: 'fixed',
  zIndex: 10010,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  // backgroundColor: 'rgb(0,0,0)',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
