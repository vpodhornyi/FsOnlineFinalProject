import React from "react";
import PropTypes from "prop-types";

import {Confirm} from '@components';

const DeleteForAllMessageConfirm = ({toggleModal, params}) => {
  const confirm = () => {
    console.log('delete for all');
    toggleModal();
  }

  return <Confirm
    title='Delete message for all?'
    description='This message will be deleted for ALL users in the conversation.'
    confirmName='Delete'
    confirmAction={confirm}
    toggleModal={toggleModal}
    confirmClassName='RedConfirmButton'
  />
}

DeleteForAllMessageConfirm.propTypes = {
  toggleModal: PropTypes.func,
  params: PropTypes.object,
}
export default DeleteForAllMessageConfirm;
