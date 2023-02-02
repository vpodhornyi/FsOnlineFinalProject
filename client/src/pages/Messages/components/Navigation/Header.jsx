import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import Avatar from "./Avatar";
import {ACTIONS as DIALOG_ACTIONS} from "@redux/dialog/action";
import {ACTIONS as MESSAGE_SEARCH_ACTIONS} from "@redux/message/search/action";
import DialogNewMessage from "../UserSearch";


const Header = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(MESSAGE_SEARCH_ACTIONS.resetSearchUsers());
    dispatch(DIALOG_ACTIONS.openDialog({Component: DialogNewMessage}));
  }

  return (
    <BoxWrapper>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Avatar/>
        <Typography variant='h2'>Messages</Typography>
      </Box>
      <Box onClick={onClick}>
        <CustomIconButton name='ForwardToInboxOutlined' title='New message' color='text'/>
      </Box>
    </BoxWrapper>
  );
}

const styles = ({theme}) => ({
  zIndex: 1100,
  boxSizing: 'border-box',
  width: '100%',
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [theme.breakpoints.up('md')]: {
    width: 360,
  },

  [theme.breakpoints.up('lg')]: {
    width: 390,
  },

  '& .MuiTypography-root': {
    fontSize: '1.3rem',
    fontWeight: theme.typography.fontWeightBold
  }
});

const BoxWrapper = styled(Box)(styles);

export default Header;
