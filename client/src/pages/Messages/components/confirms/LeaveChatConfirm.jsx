import React from "react";
import PropTypes from "prop-types";

import {Confirm} from '@components';


const LeaveChatConfirm = ({modalClose}) => {

  const confirm = () => console.log('delete');

  return <Confirm
    title='Leave conversation?'
    description='This conversation will be deleted from your inbox.
    Other people in the conversation will still be able to see it.'
    confirmName='Leave'
    confirmAction={confirm}
    modalClose={modalClose}
    confirmClassName='RedConfirmButton'
  />
}

LeaveChatConfirm.propTypes = {
  modalClose: PropTypes.func,
}

export default LeaveChatConfirm;
