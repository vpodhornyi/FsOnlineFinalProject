import React from "react";
import PropTypes from "prop-types";

import {Confirm} from '@components';

const DeleteMessageConfirm = ({toggleModal}) => {
  const confirm = () => {
    console.log('delete');
    toggleModal();
  }

  return <Confirm
    title='Delete message?'
    description='This message will be deleted for you.
         Other people in the conversation will still be able to see it.'
    confirmName='Delete'
    confirmAction={confirm}
    toggleModal={toggleModal}
    confirmClassName='RedConfirmButton'
  />
}

DeleteMessageConfirm.propTypes = {
  toggleModal: PropTypes.func,
}
export default DeleteMessageConfirm;
