import React from "react";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

import {Confirm} from '@components';
import {leaveChat} from "@redux/chat/action";

const LeaveChatConfirm = ({toggleModal, chat}) => {
  const dispatch = useDispatch();
  const confirm = () => {
    const body = {
      chatId: chat.id,
      isPrivate: chat.isPrivate,
      isGroup: chat.isGroup,
    }
    dispatch(leaveChat(body));
    toggleModal();
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
  chat: PropTypes.object,
}

export default LeaveChatConfirm;
