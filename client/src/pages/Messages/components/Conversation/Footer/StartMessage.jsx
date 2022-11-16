import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import {getMessageData} from "@redux/message/selector";
import CustomIconButton from "@components/buttons/CustomIconButton";
import CustomTextField from "./CustomTextField";
import {sendMessage} from "@redux/message/action";

const StartMessage = () => {
  const {isDetailLoading, message, user} = useSelector(getMessageData);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  }

  const buttonClickSend = () => {
    dispatch(sendMessage({text, user}));
    setText('')
  }

  const enterKeyDownSend = (e) => {
    if (e.keyCode === 13) {
      dispatch(sendMessage({text, user}));
      setText('')
    }
  }

  return (<Box sx={{
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(239, 243, 244)',
    borderRadius: '16px'
  }}>
    <Box>
      <CustomIconButton name='PermMediaOutlined' iconSize='small'/>
    </Box>
    <Box>
      <CustomIconButton name='GifBoxOutlined' iconSize='small'/>
    </Box>
    <Box>
      <CustomIconButton name='EmojiEmotionsOutlined' iconSize='small'/>
    </Box>
    <CustomTextField enterKeyDownSend={enterKeyDownSend} onChange={onChange} text={text}/>
    <Box onClick={buttonClickSend}>
      <CustomIconButton name='SendOutlined' iconSize='small' disabled={false}/>
    </Box>
  </Box>);
}

export default StartMessage;
