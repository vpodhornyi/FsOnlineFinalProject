import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {getMessageData} from "@redux/message/selector";
import {ACTIONS, sendMessage} from "@redux/message/action";
import {CustomIconButton} from "../../../../../components";
import CustomTextField from "./CustomTextField";

const StartMessage = ({onBottom}) => {
  const inputRef = useRef();
  const {newMessage: {chatId, text}} = useSelector(getMessageData);
  const dispatch = useDispatch();

  const send = () => {
    dispatch(sendMessage({chatId, text}));
    dispatch(ACTIONS.setNewMessage({chatId, text: ''}));
    inputRef.current.focus();
    setTimeout(() => {
      onBottom();
    }, 500)
  }

  const enterKeyDown = (e) => {
    if (e.keyCode === 13) {
      send();
    }
  }

  return (
    <BoxWrapper>
      <ButtonsBoxWrapper>
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
      </ButtonsBoxWrapper>
    </BoxWrapper>
  );
}

const ButtonsBoxWrapper = styled(Box)(({theme}) => ({
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgb(239, 243, 244)',
  borderRadius: '16px',
}));

const BoxWrapper = styled(Box)(({theme}) => ({
  padding: '5px 15px',
  borderTop: '1px solid rgb(239, 243, 244)',
  backgroundColor: 'rgba(255,255,255, 1)'
}));

StartMessage.propTypes = {
  onBottom: PropTypes.func,
}

export default StartMessage;
