import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {TextField} from "@mui/material";
import {useDebouncedCallback} from 'use-debounce';
import PropTypes from "prop-types";

import {ACTIONS} from "@redux/chat/action";
import {styled} from "@mui/material/styles";

const CustomTextField = function ({chatId, message, enterKeyDown, inputRef}) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const debounced = useDebouncedCallback((text, e) => {
    dispatch(ACTIONS.setMessage({chatId, text}))
  }, 300);
  const handleChange = (e) => {
    setText(() => e.target.value);
    debounced(e.target.value, e);
  }

  useEffect(() => {
    setText(() => message || '');
  }, [chatId, message])

  return <TextFieldWrapper
    inputRef={inputRef}
    onChange={handleChange}
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
  chatId: PropTypes.number,
  message: PropTypes.string,
  enterKeyDown: PropTypes.func,
  inputRef: PropTypes.object,
}

export default CustomTextField;
