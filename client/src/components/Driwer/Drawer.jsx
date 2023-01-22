import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography, Divider} from "@mui/material";
import PropTypes from "prop-types";

import {CustomIconButton} from "../buttons";
import UserInfo from './UserInfo';
import MainMenu from "../NavBar/MainMenu";
import {mobileMenu} from '@utils/menu';
import {getChatsData} from '@redux/chat/selector';

const Drawer = ({toggleDrawer}) => {
  const {authUser} = useSelector(state => state.user);
  const {isChatSelected, countUnreadMessages, chatId} = useSelector(getChatsData);
  const menu = mobileMenu(authUser.userTag, true, isChatSelected, countUnreadMessages, chatId);

  return (
    <BoxWrapper>
      <Header>
        <Typography fontWeight='bold' fontSize='1.2rem'>Account info</Typography>
        <Box onClick={toggleDrawer()}>
          <CustomIconButton name='Close'/>
        </Box>
      </Header>
      <UserInfo user={authUser}/>
      <Divider/>
      <MainMenu user={authUser} menu={menu}/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '70%',
  minWidth: '280px',

  '& .NavigationMenu': {
    flexDirection: 'column'
  }
}));

const Header = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '5px 15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'

}));

Drawer.propTypes = {
  toggleDrawer: PropTypes.func,
}
export default Drawer;
