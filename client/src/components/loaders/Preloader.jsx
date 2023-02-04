import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {LogoIcon} from '../icons';

const Preloader = () => (
  <BoxWrapper>
    <LogoIcon/>
  </BoxWrapper>
);

const styles = ({theme}) => ({
  position: 'fixed',
  zIndex: 11111,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& > .IconByName': {
    fontSize: '10rem',
    color: theme.palette.primary.light
  }

});

const BoxWrapper = styled(Box)(styles);

export default Preloader;
