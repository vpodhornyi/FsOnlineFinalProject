import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, LinearProgress, TextField} from "@mui/material";
import PropTypes from "prop-types";

import {CustomIconButton} from "../../../../components";
import {useDebouncedCallback} from "use-debounce";
import {ACTIONS} from "@redux/chat/action";
import {getChatsData} from "@redux/chat/selector";

const StartMessage = ({sending, chatId, inputRef, sendMessage}) => {
  const dispatch = useDispatch();
  const {message} = useSelector(getChatsData);
  const [text, setText] = useState('');

  const debounced = useDebouncedCallback((text) => {
    dispatch(ACTIONS.setMessage({chatId, text}))
  }, 500);
  const handleChangeInputText = (e) => {
    const text = e.target.value;
    if (text[text.length - 1] !== '\n') {
      setText(() => e.target.value);
      debounced(e.target.value);
    }
  }

  useEffect(() => {
    setText(() => message || '');
  }, [chatId])

  const onClickSend = () => {
    setText(() => '');
    sendMessage(text);
  }

  const onKeyDown = async (e) => {
    if (e.keyCode === 13) {
      await onClickSend();
    }
  }

  return (
    <BoxWrapper>
      <ProgressWrapper>
        {sending && <LinearProgress color='primary' sx={{height: 2}}/>}
      </ProgressWrapper>
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
        <TextFieldWrapper
          inputRef={inputRef}
          onChange={handleChangeInputText}
          onKeyDown={onKeyDown}
          value={text}
          placeholder='Start a new message'
          multiline
          id="messageText"
          variant="filled"/>
        <Box onClick={onClickSend}>
          <CustomIconButton
            color='primary'
            name='SendOutlined'
            iconSize='small'
            disabled={!text || text?.trim() === ''}/>
        </Box>
      </ButtonsBoxWrapper>
    </BoxWrapper>
  );
}

const ProgressWrapper = styled(Box)(({theme}) => ({
  position: 'absolute',
  height: 2,
  top: 0,
  left: 0,
  right: 0,
}));
const ButtonsBoxWrapper = styled(Box)(({theme}) => ({
  position: 'relative',
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

StartMessage.propTypes = {
  sending: PropTypes.bool,
  chatId: PropTypes.number,
  inputRef: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default StartMessage;
