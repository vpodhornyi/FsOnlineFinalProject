import React from "react";
import PropTypes from "prop-types";

import {Confirm} from '@components';

const LeaveChatConfirm = ({toggleModal}) => {

  const confirm = () => {
    console.log('Leave');
    toggleModal(null);
  }

  return <Confirm
    title='Leave conversation?'
    description='This conversation will be deleted from your inbox.
    Other people in the conversation will still be able to see it.'
    confirmName='Leave'
    confirmAction={confirm}
    toggleModal={toggleModal}
    confirmClassName='RedConfirmButton'
  />
}

LeaveChatConfirm.propTypes = {
  toggleModal: PropTypes.func,
}

export default LeaveChatConfirm;
