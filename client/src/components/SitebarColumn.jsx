import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const styles = ({theme}) => ({
  backgroundColor: theme.palette.primary.secondary,
  display: 'none',
  height: '100%',

  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: 290,
  },
  [theme.breakpoints.up('lg')]: {
    width: 350,
  }
})

export default styled(Box)(styles);

