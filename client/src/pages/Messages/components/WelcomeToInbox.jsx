import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomFabButton from "@components/buttons/CustomFabButton";
import DialogNewMessage from "./DialogNewMessage";
import {openDialog} from "@redux/dialog/action";

const WelcomeToInbox = () => {
  const dispatch = useDispatch();

  return (
    <StyledBox>
      <Box>
        <Typography sx={{fontWeight: 600}} variant='h2'>Welcome to your inbox!</Typography>
        <Typography sx={{pb: 3, pt: 1}} variant='body1'>Drop a line, share Tweets and more with private conversation
          between you and others on Twitter</Typography>
        <Box onClick={() => dispatch(openDialog(DialogNewMessage))}>
          <CustomFabButton name='Write a message'/>
        </Box>
      </Box>
    </StyledBox>);
}

const styles = ({theme}) => ({
  paddingTop: 20,
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',

  '& > .MuiBox-root': {
    width: '320px'
  }

});

const StyledBox = styled(Box)(styles);

export default WelcomeToInbox;
