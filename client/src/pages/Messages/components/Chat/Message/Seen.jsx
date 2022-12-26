import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Typography} from "@mui/material";
import PropTypes from "prop-types";

const Seen = ({left, message}) => {
  const dispatch = useDispatch();

  const text = message?.sending ? 'Sending ...' : message?.seen ? 'Seen' : 'Sent';

  return (
    <>
      {
        !left && message?.isPrivateChat && <Text text={text}/>
      }
      {
        !left && message?.isGroupChat && <Text text='Seen by 1 person'/>
      }
    </>);
}


const Text = ({text}) => {
  return <Typography sx={{
    '&:before': {
      content: '"·"',
      marginLeft: '5px',
      marginRight: '5px',
    }
  }} variant='body2'>{text}</Typography>
}

Seen.propTypes = {
  left: PropTypes.bool,
  message: PropTypes.object,
}

Text.propTypes = {
  text: PropTypes.string,
}
export default Seen;
