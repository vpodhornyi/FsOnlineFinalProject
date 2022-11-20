import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";
import {ACTIONS, searchUser} from "@redux/message/search/action";
import {getMessageSearchData} from "@redux/message/search/selector";

const SearchTextField = () => {
  const dispatch = useDispatch();
  const {text} = useSelector(getMessageSearchData);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchUser({text}))
    }, 500);

    return () => clearTimeout(timer)
  }, [text])

  return (
    <TextFieldWrapper
      value={text}
      onChange={e => dispatch(ACTIONS.setSearchText({text: e.target.value}))}
      placeholder="Search people"
      variant="standard"
      fullWidth/>
  )
}

const styles = ({theme}) => ({
  '& .MuiInputBase-root': {
    paddingLeft: 50,
    paddingBottom: 5,

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
