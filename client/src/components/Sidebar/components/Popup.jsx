import React from 'react';
import PropTypes from "prop-types";
import Popover from "@mui/material/Popover";
import {styled} from "@mui/system";
import {Box, MenuItem} from "@mui/material";

export const StyledPopupTextWrap = styled(props => (<Box {...props}/>)) (() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "250px",
    height: "120px",
}))
export const StyledPopupText = styled(props => (<MenuItem {...props}/>)) (() => ({padding: "10px", cursor: "pointer"}))

const Popup = ({
                   anchorVertical,
                   anchorHorizontal,
                   originVertical,
                   originHorizontal,
                   open,
                   handleClose,
                   id,
                   children,
                   anchorEl,
               }) => {
    return (
        <Popover
            id={id}
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
                vertical: anchorVertical,
                horizontal: anchorHorizontal,
            }}
            transformOrigin={{
                vertical: originVertical,
                horizontal: originHorizontal,
            }}
            onClose={handleClose}
        >
            {children}
        </Popover>
    );
};

Popup.propTypes = {
    anchorVertical: PropTypes.string,
    anchorHorizontal: PropTypes.string,
    originVertical: PropTypes.string,
    originHorizontal: PropTypes.string,
    open: PropTypes.bool,
    id: PropTypes.string || undefined,
    anchorEl: PropTypes.any,
    handleClose: PropTypes.func,
    children: PropTypes.any
}

export default Popup;