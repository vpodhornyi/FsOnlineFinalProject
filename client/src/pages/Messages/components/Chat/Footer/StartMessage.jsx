import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {getCurrentChat} from "@redux/message/selector";
import CustomIconButton from "@components/buttons/CustomIconButton";
import CustomTextField from "./CustomTextField";
import {ACTIONS as messageActions, sendMessage} from "@redux/message/action";

const StartMessage = () => {
  const inputRef = useRef();
  const currentChat = useSelector(getCurrentChat);
  const {text, id} = currentChat;
  const dispatch = useDispatch();

  const send = () => {
    dispatch(sendMessage({text, id}));
    dispatch(messageActions.setMessage({text: '', id}));
    inputRef.current.focus();
  }

  const enterKeyDown = (e) => {
    if (e.keyCode === 13) {
      send();
    }
  }

  return (
    <BoxWrapper>
      <Box>
        <CustomIconButton name='PermMediaOutlined' iconSize='small'/>
      </Box>
      <Box>
        <CustomIconButton name='GifBoxOutlined' iconSize='small'/>
      </Box>
      <Box>
        <CustomIconButton name='EmojiEmotionsOutlined' iconSize='small'/>
      </Box>
      <CustomTextField enterKeyDown={enterKeyDown} inputRef={inputRef}/>
      <Box onClick={send}>
        <CustomIconButton name='SendOutlined' iconSize='small' disabled={!text}/>
      </Box>
    </BoxWrapper>);
}

const styles = theme => ({
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgb(239, 243, 244)',
  borderRadius: '16px'
});

const BoxWrapper = styled(Box)(styles);

export default StartMessage;
