import React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { getModalState } from "../../redux/modal/selector";
import PropTypes from "prop-types";
import { closeModal } from "../../redux/modal/action";

const Modal = ({ children, type }) => {
  const matches = useMediaQuery("(max-width:700px)");
  const dispatch = useDispatch();
  const { open, typeModal } = useSelector(getModalState);
  return (
    <Dialog
      fullScreen={matches}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="customized-dialog-title"
      open={open && type === typeModal}
    >
      {children}
    </Dialog>
  );
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};
export default Modal;
