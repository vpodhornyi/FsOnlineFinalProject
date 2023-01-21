import * as React from 'react';
import {styled} from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import {Typography} from "@mui/material";
import PropTypes from "prop-types";

const CustomFabButton = ({onClick, className, name, disabled}) => {
  return (
    <FabWrapper
      onClick={onClick}
      disabled={disabled}
      className={className}
      variant="extended">
      <Typography className='CustomFabButtonName' variant='body1'>{name}</Typography>
    </FabWrapper>
  );
};

const styles = ({theme}) => ({
  textTransform: 'none',
  boxShadow: 'none',

  '&:active': {
    boxShadow: 'none',
  },

  '& .MuiTouchRipple-root': {
    display: 'none'
  },
});

const FabWrapper = styled(Fab)(styles);

CustomFabButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
}

export default CustomFabButton;
