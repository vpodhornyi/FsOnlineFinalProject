import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "@mui/material";
import {getCurrentChat} from "@redux/message/selector";
import {ACTIONS as messageActions} from "@redux/message/action";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

const CustomTextField = function ({enterKeyDown, inputRef}) {
  const currentChat  = useSelector(getCurrentChat);
  const {text, id} = currentChat;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(messageActions.setMessage({id, text: e.target.value}));
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

const styles = theme => ({
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
});

const TextFieldWrapper = styled(TextField)(styles);

CustomTextField.propTypes = {
  enterKeyDown: PropTypes.func,
  inputRef: PropTypes.object,
}

export default CustomTextField;
