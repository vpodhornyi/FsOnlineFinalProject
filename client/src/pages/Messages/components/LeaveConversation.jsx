import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Modal} from "@mui/material";
import PropTypes from "prop-types";

import {CustomModal, Confirm} from '@components';

const LeaveConfirm = () => {
  return <BoxWrapper>
    <Confirm
      title='Leave conversation?'
      description='This conversation will be deleted from your inbox.
    Other people in the conversation will still be able to see it.'
      confirmName='Leave'
      confirmAction={confirm}
    />
  </BoxWrapper>
}
const LeaveConversation = ({open, handleClose}) => {
  const confirm = () => console.log('delete');

  return <CustomModal
    open={open}
    handleClose={handleClose}
    element={<LeaveConfirm/>}
  />;
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& .ConfirmButton': {
    marginBottom: '11px',
    backgroundColor: theme.palette.redAccent.main,

    '&:hover': {
      backgroundColor: theme.palette.redAccent.secondary,
    },

    '& > .CustomFabButtonName': {
      color: '#ffffff',
      fontWeight: theme.typography.fontWeightBold,
    }
  },

  '& .CancelButton': {
    border: '1px solid rgb(207, 217, 222)',
    backgroundColor: 'rgba(0, 0, 0, 0)',

    '&:hover': {
      backgroundColor: 'rgba(15, 20, 25, 0.1)',
    },

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
    }
  }
}));

LeaveConversation.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  element: PropTypes.element,
}
export default LeaveConversation;
