import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {BackgroundContext} from "../utils/context";
import {PATH} from "../utils/constants";


const ModalPage = ({element, closable = true}) => {
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);

  const onClick = () => {
    closable && navigate(background?.pathname || PATH.ROOT);
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && closable && navigate(background?.pathname || PATH.ROOT)
    })
  }, [])

  return (
    <StyledBox
      onClick={onClick}>
      <Box onClick={e => e.stopPropagation()}>
        {
          element
        }
      </Box>
    </StyledBox>)
}


const StyledBox = styled(Box)(({theme}) => ({
  position: 'fixed',
  zIndex: 10010,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

ModalPage.propTypes = {
  element: PropTypes.object,
  closable: PropTypes.bool,
}

export default ModalPage;
