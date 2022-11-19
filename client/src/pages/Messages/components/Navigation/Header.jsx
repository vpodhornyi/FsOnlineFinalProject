import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import Avatar from "./Avatar";
import {openDialog} from "@redux/dialog/action";
import DialogNewMessage from "../DialogNewMessage";


const styles = ({theme}) => ({
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

const Header = () => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Avatar/>
        <Typography variant='h2'>Messages</Typography>
      </Box>
      <Box onClick={() => dispatch(openDialog(DialogNewMessage))}>
        <CustomIconButton name='ForwardToInboxOutlined' title='New message'/>
      </Box>
    </BoxWrapper>
  );
}

export default Header;
