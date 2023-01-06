import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import {Confirm} from '@components';
import {leaveChat} from "@redux/chat/action";
import {ACTIONS} from "@redux/chat/message/action";
import {getChatsData} from "@redux/chat/selector";
import {PATH} from "@utils/constants";

const LeaveChatConfirm = ({toggleModal, chat}) => {
  const dispatch = useDispatch();
  const {chatId} = useSelector(getChatsData);
  const navigate = useNavigate();

  const confirm = () => {
    const body = {
      chatId: chat.id,
      privateChat: chat.isPrivate,
      groupChat: chat.isGroup,
    }
    if (chatId === chat.id) {
      navigate(PATH.MESSAGES.ROOT);
      dispatch(ACTIONS.resetMessages())
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
