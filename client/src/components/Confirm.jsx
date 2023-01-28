import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {CustomFabButton} from '@components';

const Confirm = ({title, description, confirmName, confirmAction, toggleModal, confirmClassName}) => {
  return <BoxWrapper >
    {title &&
      <Typography
        sx={{mb: 1}}
        fontSize='1.254rem'
        fontWeight='fontWeightBold'
        variant='h2'>{title}</Typography>
    }
    <Typography sx={{mb: '23px'}} variant='body2'>{description}</Typography>
    <CustomFabButton onClick={confirmAction} className={confirmClassName} name={confirmName}/>
    <CustomFabButton onClick={() => toggleModal()} className='CancelButton' name='Cancel'/>
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  padding: 30,
  borderRadius: '16px',
  backgroundColor: theme.palette.background.main,
  width: '320px',
  display: 'flex',
  flexDirection: 'column',

  '& .BlackConfirmButton': {
    marginBottom: '11px',
    backgroundColor: theme.palette.text.main,

    '&:hover': {
      backgroundColor: theme.palette.background[8],
    },

    '& > .CustomFabButtonName': {
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightBold,
    }
  },

  '& .RedConfirmButton': {
    marginBottom: '11px',
    backgroundColor: theme.palette.redAccent.main,

    '&:hover': {
      backgroundColor: theme.palette.redAccent.secondary,
    },

    '& .CustomFabButtonName': {
      color: '#ffffff',
      fontWeight: theme.typography.fontWeightBold,
    }
  },

  '& .CancelButton': {
    border: '1px solid rgb(207, 217, 222)',
    backgroundColor: theme.palette.background.main,

    '&:hover': {
      backgroundColor: theme.palette.background[1],
    },

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
    }
  }
}));

Confirm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  confirmName: PropTypes.string,
  confirmAction: PropTypes.func,
  toggleModal: PropTypes.func,
  confirmClassName: PropTypes.string,
}
export default Confirm;
