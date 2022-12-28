import React from "react";
import PropTypes from "prop-types";

import {Confirm} from '@components';

const BlockConfirm = ({userTag, toggleModal}) => {
  const confirm = () => {
    console.log('delete');
    toggleModal();
  }

  return <Confirm
      description={`Block @${userTag}, @${userTag} will no longer be able to follow or message you,
       and you will not see notifications from @${userTag} `}
      confirmName='Yes'
      confirmAction={confirm}
      toggleModal={toggleModal}
      confirmClassName='BlackConfirmButton'
    />
}

BlockConfirm.propTypes = {
  userTag: PropTypes.string,
  toggleModal: PropTypes.func,
}
export default BlockConfirm;
