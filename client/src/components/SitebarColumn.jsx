import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const styles = ({theme}) => ({
  display: 'none',
  height: '100vh',
  position: 'sticky',
  top: 0,
  borderLeft: '1px solid rgb(239, 243, 244)',
  borderRight: '1px solid rgb(239, 243, 244)',

  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: 290,
  },
  [theme.breakpoints.up('lg')]: {
    width: 350,
  }
})

export default styled(Box)(styles);

