import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Index from "./index";


const Time = ({left}) => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Typography>12:30</Typography>
    </BoxWrapper>);
}

Time.propTypes = {
  left: PropTypes.bool,
}

const styles = ({theme}) => ({
  cursor: 'pointer',
  width: '100%',
  textAlign: 'end',
  '& .MuiTypography-root': {
    textAlign: 'right'
  }

});

export default Time;
