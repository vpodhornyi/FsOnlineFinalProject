import React from "react";
import PropTypes from "prop-types";

import {Confirm} from '@components';

const DeleteMessageConfirm = ({modalClose}) => {
  const confirm = () => console.log('delete');

  return <Confirm
    title='Delete message?'
    description='This message will be deleted for you.
         Other people in the conversation will still be able to see it.'
    confirmName='Delete'
    confirmAction={confirm}
    modalClose={modalClose}
    confirmClassName='RedConfirmButton'
  />
}

DeleteMessageConfirm.propTypes = {
  modalClose: PropTypes.func,
}
export default DeleteMessageConfirm;
