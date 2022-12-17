import React from "react";
import {TextField} from "@mui/material";
import PropTypes from "prop-types";

import {styled} from "@mui/material/styles";

const CustomTextField = function ({handleChangeInputText, text, enterKeyDown, inputRef}) {

  return <TextFieldWrapper
    inputRef={inputRef}
    onChange={handleChangeInputText}
    onKeyDown={enterKeyDown}
    value={text}
    placeholder='Start a new message'
    multiline
    id="messageText"
    variant="filled"/>
}

const TextFieldWrapper = styled(TextField)(({theme}) => ({
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
}));

CustomTextField.propTypes = {
  handleChangeInputText: PropTypes.func,
  text: PropTypes.string,
  enterKeyDown: PropTypes.func,
  inputRef: PropTypes.object,
}

export default CustomTextField;
