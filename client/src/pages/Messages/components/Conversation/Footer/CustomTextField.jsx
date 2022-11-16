import React from "react";
import {TextField} from "@mui/material";
import PropTypes from "prop-types";


const CustomTextField = ({enterKeyDownSend, onChange, text}) => {

  return <TextField
    sx={{
      width: '95%',
      maxHeight: '150px',
      paddingTop: '5px',
      paddingBottom: '5px',

      '& .MuiInputBase-input': {
        overflow: 'overlay !important',
        overflowX: 'hidden',
        maxHeight: '150px',
        backgroundColor: 'rgb(239, 243, 244)',
      },

      '& .MuiFilledInput-root': {
        backgroundColor: 'rgb(239, 243, 244)',
      },

      '& .MuiInputBase-root': {
        padding: 0, marginLeft: '10px', marginRight: '10px', backgroundColor: 'rgb(239, 243, 244)',

        '&:hover': {
          backgroundColor: 'rgb(239, 243, 244)',
        },
      },

      '& .MuiInputBase-root:before': {
        content: 'none'
      },

      '& .MuiInputBase-root:after': {
        content: 'none'
      },
    }}
    onChange={onChange}
    onKeyDown={enterKeyDownSend}
    value={text}
    placeholder='Start a new message'
    multiline
    id="messageText"
    variant="filled"/>
}

CustomTextField.propTypes = {
  enterKeyDownSend: PropTypes.func,
  onChange: PropTypes.func,
  text: PropTypes.string,
}

export default CustomTextField;
