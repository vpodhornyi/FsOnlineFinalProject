import React from "react";
import {alpha, styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const Action = ({name}) => {
  return (
    <BoxWrapper className='ChatInfoActionButton'>
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

  '& .MuiTypography-root': {
    color: theme.palette.primary.main,
  },

  '&:hover': {
    backgroundColor: theme.palette.primary.alpha,
  }
}));

Action.propTypes = {
  name: PropTypes.string,
}
export default Action;
