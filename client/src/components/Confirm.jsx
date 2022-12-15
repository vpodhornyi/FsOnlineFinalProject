import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {CustomFabButton} from '@components';

const Confirm = ({title, description, confirmName, confirmAction}) => {
  return <BoxWrapper >
    {title &&
      <Typography sx={{mb: 1}} fontSize='1.254rem' fontWeight='fontWeightBold' variant='h2'>{title}</Typography>
    }
    <Typography sx={{mb: '23px'}} variant='body2'>{description}</Typography>
    <CustomFabButton onClick={confirmAction} className='ConfirmButton' name={confirmName}/>
    <CustomFabButton onClick={() => handleClose()} className='CancelButton' name='Cancel'/>
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  padding: 30,
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  width: '320px',
  display: 'flex',
  flexDirection: 'column',

  '&:focus-visible': {
    outline: 'none',
  },

}));

Confirm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  confirmName: PropTypes.string,
  confirmAction: PropTypes.func,
}
export default Confirm;
