import React from "react";
import {styled} from "@mui/material/styles";
import {Box, LinearProgress} from "@mui/material";
import PropTypes from "prop-types";

import {CustomIconButton} from "../../../../../components";
import CustomTextField from "./CustomTextField";

const StartMessage = ({sending, chatId, newText, inputRef, sendMessage, enterKeyDown}) => {

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
        <CustomTextField chatId={chatId} newText={newText} enterKeyDown={enterKeyDown} inputRef={inputRef}/>
        <Box onClick={sendMessage}>
          <CustomIconButton color='primary' name='SendOutlined' iconSize='small' disabled={newText?.trim() === ''}/>
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

StartMessage.propTypes = {
  sending: PropTypes.bool,
  chatId: PropTypes.number,
  newText: PropTypes.string,
  inputRef: PropTypes.object,
  sendMessage: PropTypes.func,
  enterKeyDown: PropTypes.func,
}

export default StartMessage;
