import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

const StickyHeader = styled(Box)(({theme}) => ({
  width: 'auto',
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(255,255,255, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export default StickyHeader;
