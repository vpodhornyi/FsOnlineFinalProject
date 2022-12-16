import React from "react";
import PropTypes from "prop-types";

import {Confirm} from '@components';

const BlockConfirm = ({userTag, modalClose}) => {
  const confirm = () => console.log('delete');

  return <Confirm
      description={`Block @${userTag}, @${userTag} will no longer be able to follow or message you,
       and you will not see notifications from @${userTag} `}
      confirmName='Yes'
      confirmAction={confirm}
      modalClose={modalClose}
      confirmClassName='BlackConfirmButton'
    />
}

BlockConfirm.propTypes = {
  userTag: PropTypes.string,
  modalClose: PropTypes.func,
}
export default BlockConfirm;
