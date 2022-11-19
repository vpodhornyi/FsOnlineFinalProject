import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";
import {searchUser} from "@redux/message/action";

const SearchTextField = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchUser({text}))
    }, 500);

    return () => clearTimeout(timer)
  }, [text])

  return (
    <TextFieldWrapper
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Search people"
      variant="standard"
      fullWidth/>
  )
}

const styles = ({theme}) => ({
  '& .MuiInputBase-root': {
    paddingLeft: 50,
    paddingBottom: 5,
    borderBottom: '1px solid #DDDFE2',

    '&:before': {
      content: 'none'
    },

    '&:after': {
      content: 'none'
    },
  },

});

const TextFieldWrapper = styled(TextField)(styles);

export default SearchTextField;
