import React from "react";
import {Box} from "@mui/material";

import {useModal} from '../../../../hooks/useModal';
import Action from "./Action";
import LeaveChatConfirm from "../confirms/LeaveChatConfirm";
import {ModalWindow} from "../../../../components";

const LeaveChat = () => {
  const {modal, toggleModal} = useModal();

  return (
    <Box onClick={() => toggleModal(<LeaveChatConfirm toggleModal={toggleModal}/>, true)}>
      <Action style={{
        color: 'rgb(244, 33, 46)',
        '&:hover': {
          backgroundColor: 'rgba(244, 33, 46, 0.1)',
        }
      }}
              name={`Leave conversation`}/>
      <ModalWindow
        isShowing={modal.isShowing}
        toggleModal={toggleModal}
        element={modal.element}
      />
    </Box>);
}

export default LeaveChat;
