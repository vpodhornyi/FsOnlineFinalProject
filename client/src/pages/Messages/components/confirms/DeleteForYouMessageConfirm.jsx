import React from "react";
import PropTypes from "prop-types";

import {Confirm} from '@components';

const DeleteForYouMessageConfirm = ({toggleModal}) => {
  const confirm = () => {
    console.log('delete');
    toggleModal(null);
  }

  return <Confirm
    title='Delete message for you?'
    description='This message will be deleted for you.
         Other people in the conversation will still be able to see it.'
    confirmName='Delete'
    confirmAction={confirm}
    toggleModal={toggleModal}
    confirmClassName='RedConfirmButton'
  />
}

DeleteForYouMessageConfirm.propTypes = {
  toggleModal: PropTypes.func,
}
export default DeleteForYouMessageConfirm;
