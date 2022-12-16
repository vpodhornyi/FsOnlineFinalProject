import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {getRandomKey} from "@utils";
import SwitchAction from './SwitchAction';
import BlockUser from './BlockUser';
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
      <Box sx={{width: '100%', pb: 1, mb: 1, borderBottom: '1px solid rgb(239, 243, 244)'}}>
        <Typography
          sx={{padding: '11px 15px'}}
          fontSize='1.5rem'
          fontWeight='fontWeightBold'
          variant='h2'>
          Notifications
        </Typography>
        {chat.isPrivate && privateSwitchActions.map(v => <SwitchAction key={v.key} name={v.name(chat.title)}/>)}
        {chat.isGroup && groupSwitchActions.map(v => {
          return <SwitchAction
            key={v.key}
            name={v.name(chat.title)}
            description={v.description}
          />
        })}
      </Box>
      {chat.isPrivate && <BlockUser userTag={chat?.guestUser?.userTag}/>}
      <LeaveChat/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderTop: '1px solid rgb(239, 243, 244)',
  marginTop: 3,
}));

Notifications.propTypes = {
  chat: PropTypes.object,
}

export default Notifications;
