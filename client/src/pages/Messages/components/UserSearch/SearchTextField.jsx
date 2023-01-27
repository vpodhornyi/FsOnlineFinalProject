import React from "react";
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";
import PropTypes from "prop-types";

const SearchTextField = ({text, onChange, inputRef}) => {
  return (
    <TextFieldWrapper
      inputRef={inputRef}
      value={text}
      onChange={onChange}
      placeholder="Search people"
      variant="standard"
      fullWidth/>
  )
}

const TextFieldWrapper = styled(TextField)(({theme}) => ({
  '& .MuiInputBase-root': {
    paddingLeft: 50,
    paddingBottom: 5,
    color: theme.palette.text.main,

    '&:before': {
      content: 'none'
    },

    '&:after': {
      content: 'none'
    },
  },
}));

SearchTextField.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  inputRef: PropTypes.object,
}

export default SearchTextField;
