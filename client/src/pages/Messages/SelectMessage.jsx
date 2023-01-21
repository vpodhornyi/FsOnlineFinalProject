import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

import Action from "./components/Action";
import {ACTIONS} from '@redux/chat/action';
import {getChatsData} from '@redux/chat/selector';
import {PrimaryHeader} from "../../components";
import MessagesHeader from "./Header";

const ACTION_TITLE = 'Select a message';
const ACTION_DESCRIPTION = 'Choose from your existing conversations, start a new one, or just keep swimming.';
const ACTION_BTN_NAME = 'New message';

const SelectMessage = () => {
  const dispatch = useDispatch();
  const {isChatSelected} = useSelector(getChatsData);

  useEffect(() => {
    isChatSelected && dispatch(ACTIONS.resetChatId());
  }, []);

  return (
    <StyledBox>
      <Action
        title={ACTION_TITLE}
        description={ACTION_DESCRIPTION}
        btnName={ACTION_BTN_NAME}
      />
    </StyledBox>
  );
}

const styles = ({theme}) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

});

const StyledBox = styled(Box)(styles);

export default SelectMessage;
