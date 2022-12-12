import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {moment} from "@utils";
const Time = ({time}) => {
  return (
    <BoxWrapper>
      <Typography variant='body2'>{moment(time).fromNow(true)}</Typography>
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
  time: PropTypes.string,
}

export default Time;
