import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography, Divider} from "@mui/material";
import PropTypes from "prop-types";

import {CustomIconButton} from "../buttons";
import UserInfo from './UserInfo';
import MainMenu from "../NavBar/MainMenu";
import {mobileMenu} from '@utils/menu';
import {getChatsData} from '@redux/chat/selector';
import CustomFabButton from '../buttons/CustomFabButton';
import {useNavigate} from "react-router-dom";
import {logout} from '@redux/auth/action';

const Drawer = ({toggleDrawer}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {authUser} = useSelector(state => state.user);
  const {isChatSelected, countUnreadMessages, chatId} = useSelector(getChatsData);
  const isDrawer = true;
  const menu = mobileMenu(authUser.userTag, isDrawer, isChatSelected, countUnreadMessages, chatId);
  const logoutClick = () => {
    dispatch(logout({navigate}));
  }

  return (
    <BoxWrapper>
      <Box>
        <Header>
          <Typography fontWeight='bold' fontSize='1.2rem'>Account info</Typography>
          <Box onClick={toggleDrawer()}>
            <CustomIconButton name='Close' color='text'/>
          </Box>
        </Header>
        <UserInfo user={authUser}/>
        <Divider/>
        <MainMenu user={authUser} menu={menu}/>
      </Box>
      <Box sx={{padding: '15px', width: '100%'}}>
        <CustomFabButton
          onClick={logoutClick}
          className='LogOutBtn'
          name='Log out'/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxWidth: '70%',
  minWidth: '280px',
  height: '100%',
  backgroundColor: theme.palette.background.main,

  '& .NavigationMenu': {
    flexDirection: 'column'
  },

  '& .MuiBox-root .MuiDivider-root': {
    borderColor: theme.palette.text.main,
  },

  '& .LogOutBtn': {
    width: '100%',
    height: '35px',
    backgroundColor: theme.palette.background[9],

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.secondary,
    }
  }
}));

const Header = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '5px 15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

Drawer.propTypes = {
  toggleDrawer: PropTypes.func,
}
export default Drawer;
