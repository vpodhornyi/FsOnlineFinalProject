import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Drawer} from "@mui/material";
import PropTypes from "prop-types";

import {StickyHeader, CustomIconButton, MobileDrawer} from "../components";

const PrimaryHeader = ({isBack = false, pageElement: PageElement}) => {
  const [open, setOpen] = useState(false);
  const {authUser} = useSelector(state => state.user);
  const navigate = useNavigate();

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open);
  }

  return (<StickyHeader>
    <BoxWrapper>
      {authUser?.id && !isBack && <StyledAvatar onClick={toggleDrawer()} src={authUser.avatarImgUrl}/>}
      {isBack && <Box sx={{mr: 3}} onClick={() => navigate(-1)}>
        <CustomIconButton name='ArrowBackOutlined' title='Back' color='text'/>
      </Box>}
      <PageElement user={authUser}/>
      <Drawer anchor='left'
              open={open}
              onClose={toggleDrawer()}>
        <MobileDrawer toggleDrawer={toggleDrawer}/>
      </Drawer>
    </BoxWrapper>
  </StickyHeader>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  padding: '10px 14px',
  width: '100%',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& .HeaderTitle': {
    fontSize: '1.3rem', fontWeight: theme.typography.fontWeightBold,
  }
}));

const StyledAvatar = styled(Avatar)(({theme}) => ({
  cursor: 'pointer',
  marginRight: 10,
  width: '2.5rem',
  height: '2.5rem',

  [theme.breakpoints.up('xs')]: {
    display: 'none'
  },
}));

PrimaryHeader.propTypes = {
  pageElement: PropTypes.func, isBack: PropTypes.bool,
}
export default PrimaryHeader;
