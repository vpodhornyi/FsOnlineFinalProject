import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const styles = ({theme}) => ({
  backgroundColor: '#ff7a00',
  width: '100%',
  height: '100%',

  [theme.breakpoints.up('sm')]: {
    width: 600,
  },
})

export default styled(Box)(styles);

