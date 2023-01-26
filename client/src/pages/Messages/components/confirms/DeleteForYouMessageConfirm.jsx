import React from "react";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

import {Confirm} from '@components';
import {deleteMessage} from "@redux/chat/message/action";

const DeleteForYouMessageConfirm = ({toggleModal, message}) => {
  const dispatch = useDispatch();

  const confirm = () => {
    const body = {
      messageId: message.id,
      deleteForYou: true,
    }
    dispatch(deleteMessage(body))
    toggleModal();
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
  message: PropTypes.object,
}
export default DeleteForYouMessageConfirm;
