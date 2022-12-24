import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {moment} from "@utils";

const Time = ({message}) => {
  return (
    <BoxWrapper>
      <Typography variant='body2'>{moment(message.createdAt).fromNow(true)}</Typography>
      {
        message?.isAuthUserMessage && message?.isPrivateChat &&
        message?.seen?.seen && <Typography sx={{
          '&:before': {
            content: '"·"',
            marginLeft: '5px',
            marginRight: '5px',
          }
        }} variant='body2'>Seen</Typography>
      }
      {
        message?.isAuthUserMessage && message?.isGroupChat && <Typography sx={{
          '&:before': {
            content: '"·"',
            marginLeft: '5px',
            marginRight: '5px',
          }
        }} variant='body2'>Seen by 1 person</Typography>
      }

    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  cursor: 'pointer',
  width: '100%',
  textAlign: 'end',
  '& .MuiTypography-root': {
    textAlign: 'right'
  }
}));

Time.propTypes = {
  message: PropTypes.object,
}

export default Time;
