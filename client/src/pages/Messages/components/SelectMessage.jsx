import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomFabButton from "@components/buttons/CustomFabButton";
import DialogNewMessage from "./DialogNewMessage";
import {ACTIONS as DIALOG_ACTIONS} from "@redux/dialog/action";
import {ACTIONS as MESSAGE_SEARCH_ACTIONS} from "@redux/message/search/action";

const SelectMessage = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(MESSAGE_SEARCH_ACTIONS.resetFoundUsers());
    dispatch(DIALOG_ACTIONS.openDialog({Component: DialogNewMessage}));
  }

  return (
    <StyledBox>
      <Box sx={{
        width: '320px'
      }}>
        <Typography sx={{fontWeight: 600}} variant='h2'>Select a message</Typography>
        <Typography sx={{pb: 3, pt: 1}} variant='body1'>Choose from your existing conversations, start a new one, or
          just keep swimming.</Typography>
        <Box onClick={onClick}>
          <CustomFabButton name='New message'/>
        </Box>
      </Box>
    </StyledBox>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

});

const StyledBox = styled(Box)(styles);

export default SelectMessage;
