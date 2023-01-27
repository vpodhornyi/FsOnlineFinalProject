import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {BackgroundContext} from "../utils/context";
import {PATH} from "../utils/constants";


const ModalPage = ({element, closable = true, styles}) => {
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);

  const onClick = () => {
    closable && navigate(background?.pathname || PATH.ROOT);
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && closable && navigate(background?.pathname || PATH.ROOT);
    })
  }, []);

  return (
    <StyledBox
      sx={{...styles}}
      onClick={onClick}>
      <Box className='ModalWrapper' onClick={e => e.stopPropagation()}>
        {
          element
        }
      </Box>
    </StyledBox>)
}

const StyledBox = styled(Box)(({theme}) => ({
  position: 'fixed',
  zIndex: 1298,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  overflow: 'auto',
  backgroundColor: 'rgba(91, 112, 131, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .ModalWrapper': {
    width: '100%',
    height: '100%',

    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      height: 'auto',
    }
  }
}));

ModalPage.propTypes = {
  element: PropTypes.object,
  closable: PropTypes.bool,
  styles: PropTypes.object,
}

export default ModalPage;
