import React from "react";
import Box from "@mui/material/Box";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {Radio, FormControlLabel} from "@mui/material";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";

const ColorDot = ({backgroundColor, value}) => {
  return <Box sx={{
    width: '33.333%',
    display: 'flex',
    justifyContent: 'center',
  }}>
    <FormControlLabelWrapper
      sx={{backgroundColor}}
      value={value}
      control={<Radio color='primary' checkedIcon={<CheckOutlinedIcon/>}/>}
    />
  </Box>
}

const FormControlLabelWrapper = styled(FormControlLabel)(({theme}) => ({
  margin: 5,
  borderRadius: '50%',

  '& .MuiSvgIcon-root': {
    opacity: 0,
  },

  '& .MuiTouchRipple-root': {
    display: 'none',
  },

  '& .Mui-checked': {
    '& .MuiSvgIcon-root': {
      opacity: 1,
      color: '#ffffff',
    }
  }
}));

ColorDot.propTypes = {
  backgroundColor: PropTypes.string,
  value: PropTypes.string,
}

export default ColorDot;

