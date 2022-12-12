import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const Time = ({time}) => {
  return (
    <BoxWrapper>
      <Typography variant='body2'>{time}</Typography>
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
