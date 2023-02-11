import React from "react";
import {styled} from "@mui/material/styles";
import {Radio, FormControlLabel} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";

const BackgroundButton = ({backgroundColor, value, activeColor, title}) => {
  return (
    <FormControlLabelWrapper
      className={`${activeColor === value ? 'ActiveBackground' : ''} ${value}Class`}
      sx={{backgroundColor, borderColor: backgroundColor}}
      value={value}
      control={<Radio checkedIcon={<CheckCircle/>}/>}
      label={title}/>
  )
}

const FormControlLabelWrapper = styled(FormControlLabel)(({theme}) => ({
  position: 'relative',
  margin: '4px',
  padding: 20,
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  border: `2px solid`,

  '& .MuiSvgIcon-root': {
    color: theme.palette.greyAccent.third[400],
  },

  '& .Mui-checked': {
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      width: '20px',
      height: '20px',
    },
  },

  '& .MuiButtonBase-root': {
    position: 'absolute',
    left: 0,
  },

  '& .MuiTypography-root': {
    fontWeight: theme.typography.fontWeightBold,
  },

  [theme.breakpoints.up('sm')]: {
    width: '22%',
  }
}));

BackgroundButton.propTypes = {
  backgroundColor: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  activeColor: PropTypes.string,
  title: PropTypes.string,
}
export default BackgroundButton;
