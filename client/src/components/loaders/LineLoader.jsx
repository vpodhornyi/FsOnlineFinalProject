import React from "react";
import {styled} from "@mui/material/styles";
import {Box, LinearProgress} from "@mui/material";
import PropTypes from "prop-types";

const LineLoader = ({color = 'primary'}) => {

  return (
    <BoxWrapper>
      <LinearProgress color={color}/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '3px 0',
}));

LineLoader.propTypes = {
  color: PropTypes.string,
}
export default LineLoader;
