import React from "react";
import {Box, Modal} from "@mui/material";
import PropTypes from "prop-types";

const CustomModal = ({open, handleClose, element}) => {
  return (
    <Modal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => handleClose()}
      onClose={() => handleClose()}
      open={open}>
      <Box onClick={e => e.stopPropagation()}>
        {element}
      </Box>
    </Modal>
  );
}

CustomModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  element: PropTypes.element,
}
export default CustomModal;
