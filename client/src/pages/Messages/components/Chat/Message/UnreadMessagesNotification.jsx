import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

const UnreadMessagesNotification = () => {

  return (
    <BoxWrapper>
      <Typography variant='body2'>Unread Messages</Typography>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '3px 0',
  backgroundColor: 'rgb(247, 249, 249)',
  marginBottom: 10,

  '& .MuiTypography-root': {
    textAlign: 'center',
  }
}));
export default UnreadMessagesNotification;
