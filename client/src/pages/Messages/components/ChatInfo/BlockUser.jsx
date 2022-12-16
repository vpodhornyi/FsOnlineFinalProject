import React from "react";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {useModal} from '../../../../hooks/useModal';
import Action from "./Action";
import BlockConfirm from "../confirms/BlockConfirm";
import {ModalWindow} from "../../../../components";

const BlockUser = ({userTag}) => {
  const {isShowing, toggle} = useModal();

  return (
    <Box onClick={() => toggle()}>
      <Action name={`Block @${userTag}`}/>
      <ModalWindow
        isShowing={isShowing}
        handleClose={toggle}
        element={<BlockConfirm userTag={userTag} modalClose={toggle}/>}/>
    </Box>);
}

BlockUser.propTypes = {
  userTag: PropTypes.string,
}
export default BlockUser;
