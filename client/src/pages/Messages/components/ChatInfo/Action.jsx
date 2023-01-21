import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const Action = ({style, name}) => {
  return (
    <BoxWrapper sx={style}>
      <Typography>{name}</Typography>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '15px',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: '0.2s',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.third,
  }
}));

Action.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
}
export default Action;
