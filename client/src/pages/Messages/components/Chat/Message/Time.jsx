import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {moment} from "@utils";
import Seen from "./Seen";

const Time = ({left, message}) => {
  return (
    <BoxWrapper>
      <Typography variant='body2'>{moment(message.createdAt).fromNow(true)}</Typography>
      <Seen left={left} message={message}/>
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
  left: PropTypes.bool,
  message: PropTypes.object,
}

export default Time;
