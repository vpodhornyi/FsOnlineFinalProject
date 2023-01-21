import React from "react";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

import {Confirm} from '@components';
import {deleteMessage} from "@redux/chat/message/action";

const DeleteForAllMessageConfirm = ({toggleModal, message}) => {
  const dispatch = useDispatch();

  const confirm = () => {
    const body = {
      chatId: message.chatId,
      messageId: message.id,
      deleteForAll: true,
    }
    dispatch(deleteMessage(body))
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
  message: PropTypes.object,
}
export default DeleteForAllMessageConfirm;
