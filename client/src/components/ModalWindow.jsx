import React from "react";
import {Box, Modal} from "@mui/material";
import PropTypes from "prop-types";

const ModalWindow = ({style, isShowing, modalClose, element}) => {
  return (
    <Modal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
      onClick={() => modalClose()}
      onClose={() => modalClose()}
      open={isShowing}>
      <Box sx={{
        '&:focus-visible': {
          outline: 'none',
        }
      }}
           onClick={e => e.stopPropagation()}>
        {element}
      </Box>
    </Modal>
  );
}

ModalWindow.propTypes = {
  style: PropTypes.object,
  isShowing: PropTypes.bool,
  modalClose: PropTypes.func,
  element: PropTypes.element,
}
export default ModalWindow;
