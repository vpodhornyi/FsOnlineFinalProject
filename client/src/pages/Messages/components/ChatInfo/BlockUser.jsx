import React from "react";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {useModal} from '../../../../hooks/useModal';
import Action from "./Action";
import BlockConfirm from "../confirms/BlockConfirm";
import {ModalWindow} from "../../../../components";

const BlockUser = ({userTag}) => {
  const {modal, toggleModal} = useModal();

  return (
    <Box onClick={() => toggleModal(<BlockConfirm toggleModal={toggleModal}/>, true)}>
      <Action name={`Block @${userTag}`}/>
      <ModalWindow
        isShowing={modal.isShowing}
        toggleModal={toggleModal}
        element={modal.element}
      />
    </Box>);
}

BlockUser.propTypes = {
  userTag: PropTypes.string,
}
export default BlockUser;
