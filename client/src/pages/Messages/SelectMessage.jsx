import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Action from "./components/Action";

const ACTION_TITLE = 'Select a message';
const ACTION_DESCRIPTION = 'Choose from your existing conversations, start a new one, or just keep swimming.';
const ACTION_BTN_NAME = 'New message';

const SelectMessage = () => {
  return (
    <StyledBox>
      <Action
      title={ACTION_TITLE}
      description={ACTION_DESCRIPTION}
      btnName={ACTION_BTN_NAME}
      />
    </StyledBox>);
}

const styles = ({theme}) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

});

const StyledBox = styled(Box)(styles);

export default SelectMessage;
