import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {getRandomKey} from "@utils";
import LeaveChat from './LeaveChat';

const privateSwitchActions = [
  {
    key: getRandomKey(),
    name: name => `Snooze notifications from ${name}`
  }
];
const groupSwitchActions = [
  {
    key: getRandomKey(),
    name: name => `Snooze notifications from ${name}`
  },
  {
    key: getRandomKey(),
    name: () => `Snooze mentions`,
    description: 'Disable notifications when people mention you in this conversation.',
  },
]


const Notifications = ({chat}) => {

  return (
      <BoxWrapper>
        <LeaveChat chat={chat}/>
      </BoxWrapper>)
      ;
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${theme.palette.border.main}`,
  marginTop: 3,

  '& > .MuiBox-root': {
    width: '100%',
  },

  '& .NotificationsTitle': {
    borderBottom: `1px solid ${theme.palette.border.main}`,
  }
}));

Notifications.propTypes = {
  chat: PropTypes.object,
}

export default Notifications;
