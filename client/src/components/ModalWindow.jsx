import React from "react";
import {Box, Modal} from "@mui/material";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";

const ModalWindow = ({style, isShowing, toggleModal, element}) => {
  return (
    <StyledModal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
      onClick={() => toggleModal()}
      onClose={() => toggleModal()}
      open={isShowing}>
      <Box sx={{
        '&:focus-visible': {
          outline: 'none',
        }
      }}
           onClick={e => e.stopPropagation()}>
        {element}
      </Box>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)(({theme}) => ({
  backgroundColor: 'rgba(91, 112, 131, 0.4)',
}));

ModalWindow.propTypes = {
  style: PropTypes.object,
  isShowing: PropTypes.bool,
  toggleModal: PropTypes.func,
  element: PropTypes.element,
}
export default ModalWindow;
