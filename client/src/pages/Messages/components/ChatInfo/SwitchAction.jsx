import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Switch, Typography} from "@mui/material";
import PropTypes from "prop-types";


const SwitchAction = ({name, description}) => {
  return (
    <BoxWrapper>
      <Box>
        <Typography>{name}</Typography>
        <Switch color='primary'/>
      </Box>
      <Typography variant='body2'>{description}</Typography>
    </BoxWrapper>
  )
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '4px 15px',

  '& > .MuiBox-root': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  '& > .MuiTypography-root': {
    fontSize: '0.9rem'
  }
}));

SwitchAction.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
}
export default SwitchAction;
