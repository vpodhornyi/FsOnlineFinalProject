import React from "react";
import {styled} from "@mui/material/styles";
import {Box, CircularProgress} from "@mui/material";
import PropTypes from "prop-types";

const CircularLoader = ({size, styles}) => {
  return (
    <BoxWrapper sx={{...styles}}>
      <CircularProgress size={size}/>
    </BoxWrapper>
  )
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1112,
  backgroundColor: '#ffffff',
});

const BoxWrapper = styled(Box)(styles);

CircularLoader.propTypes = {
  styles: PropTypes.object,
  size: PropTypes.number,
}

export default CircularLoader;
