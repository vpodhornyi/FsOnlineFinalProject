import React from "react";
import {Box} from "@mui/material";

import {useModal} from '../../../../hooks/useModal';
import Action from "./Action";
import LeaveChatConfirm from "../confirms/LeaveChatConfirm";
import {ModalWindow} from "../../../../components";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";

const LeaveChat = ({chat}) => {
  const {modal, toggleModal} = useModal();

  return (
    <BoxWrapper onClick={() => toggleModal(<LeaveChatConfirm toggleModal={toggleModal} chat={chat}/>, true)}>
      <Action name={`Leave conversation`}/>
      <ModalWindow
        isShowing={modal.isShowing}
        toggleModal={toggleModal}
        element={modal.element}
      />
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& .ChatInfoActionButton': {

    '& .MuiTypography-root': {
      color: theme.palette.redAccent.main,
    },

    '&:hover': {
      backgroundColor: theme.palette.redAccent.light,
    },
  }
}))

LeaveChat.propTypes = {
  chat: PropTypes.object,
}

export default LeaveChat;

//ChatInfoActionButton
