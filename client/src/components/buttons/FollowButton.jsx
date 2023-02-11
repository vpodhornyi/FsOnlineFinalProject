import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {CustomFabButton} from "./.";

const FollowButton = ({name = 'Follow', disabled = false}) => {

  return (
    <BoxWrapper>
      <CustomFabButton className={disabled ? 'Disabled' : ''} name={name} disabled={disabled}/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& .MuiFab-root': {
    height: '2.2rem',
    backgroundColor: theme.palette.text.main,
    margin: '10px 0',
    transitionDuration: '0.2s',

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '0.9rem',
      color: theme.palette.text.secondary,
    },

    '&:hover': {
      backgroundColor: theme.palette.text.third,
    }
  },

  '& .Disabled': {
    opacity: 0.5
  },
}));

FollowButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
}
export default FollowButton;
