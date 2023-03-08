import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Drawer} from "@mui/material";
import PropTypes from "prop-types";

import {StickyHeader, CustomIconButton, MobileDrawer} from "../components";

const PrimaryHeader = ({isBack = false, pageElement}) => {
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
      {pageElement}
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

const StyledStickyHeader = styled(StickyHeader)(({theme}) => ({
  padding: '10px 14px',
  height: '50px',
  display: 'flex',

  '& .HeaderTitle': {
    fontSize: '1.3rem',
    fontWeight: theme.typography.fontWeightBold,
  }
}));

PrimaryHeader.propTypes = {
  pageElement: PropTypes.object,
  isBack: PropTypes.bool,
  page: PropTypes.string,
  navigateTo: PropTypes.string
}
export default PrimaryHeader;
