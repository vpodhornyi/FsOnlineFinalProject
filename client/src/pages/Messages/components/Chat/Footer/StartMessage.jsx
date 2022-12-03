import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {getMessageData} from "@redux/message/selector";
import CustomIconButton from "@components/buttons/CustomIconButton";
import CustomTextField from "./CustomTextField";
import {ACTIONS, sendMessage} from "@redux/message/action";

const StartMessage = () => {
  const inputRef = useRef();
  const {newMessage: {chatId, text}} = useSelector(getMessageData);
  const dispatch = useDispatch();

  const send = () => {
    dispatch(sendMessage({chatId, text}));
    dispatch(ACTIONS.setNewMessage({chatId, text: ''}));
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
        <CustomIconButton color='primary' name='PermMediaOutlined' iconSize='small'/>
      </Box>
      <Box>
        <CustomIconButton color='primary' name='GifBoxOutlined' iconSize='small'/>
      </Box>
      <Box>
        <CustomIconButton color='primary' name='EmojiEmotionsOutlined' iconSize='small'/>
      </Box>
      <CustomTextField enterKeyDown={enterKeyDown} inputRef={inputRef}/>
      <Box onClick={send}>
        <CustomIconButton color='primary' name='SendOutlined' iconSize='small' disabled={text?.trim() === ''}/>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgb(239, 243, 244)',
  borderRadius: '16px',
});

const BoxWrapper = styled(Box)(styles);

export default StartMessage;
