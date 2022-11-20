import * as React from 'react';
import {styled} from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import {Typography} from "@mui/material";
import PropTypes from "prop-types";


const CustomFabButton = ({name, disabled}) => {
  return (
    <FabWrapper disabled={disabled} className='CustomFabButton' variant="extended">
      <Typography variant='body1'>{name}</Typography>
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
  disabled: PropTypes.bool,
  name: PropTypes.string,
}

export default CustomFabButton;
