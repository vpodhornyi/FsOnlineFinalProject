import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {LogoIcon} from '../icons';
import PropTypes from "prop-types";

const Preloader = ({loading}) => (
  <>
    {loading && (<BoxWrapper>
      <LogoIcon/>
    </BoxWrapper>)}
  </>
);

const styles = ({theme}) => ({
  position: 'fixed',
  zIndex: 10011,
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
    color: [theme.palette.common.black]
  }

});

const BoxWrapper = styled(Box)(styles);

Preloader.propTypes = {
  loading: PropTypes.bool,
}

export default Preloader;
