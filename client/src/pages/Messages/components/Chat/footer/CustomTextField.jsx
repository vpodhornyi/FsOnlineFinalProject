import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "@mui/material";
import {getMessageData} from "@redux/message/selector";
import {ACTIONS} from "@redux/message/action";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

const CustomTextField = function ({enterKeyDown, inputRef}) {
  const {newMessage: {chatId, text}} = useSelector(getMessageData);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(ACTIONS.setNewMessage({chatId, text: e.target.value}));
  }

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
  enterKeyDown: PropTypes.func,
  inputRef: PropTypes.object,
}

export default CustomTextField;
