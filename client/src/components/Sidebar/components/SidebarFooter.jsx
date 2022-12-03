import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getPersonalData} from "@redux/auth/selector";
import {Box, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from "prop-types";
import {styled} from "@mui/system";
import {sidebarMenu} from "../data/sidebarMenu";
import Popup, {StyledPopupText, StyledPopupTextWrap} from "./Popup";
import {useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {AUTH_ROUTE, LOGOUT_ROUTE} from "../../../utils/constants";
import {logout} from '@redux/auth/action';

const SidebarFooter = () => {
  const {user: authUser} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'footer-popover' : undefined;

  return (
    <>
      <div onClick={handleClick}>
        <StyledFooter>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: "16px",
            padding: "10px",
          }} className={"sidebar__footer"}>
            <Avatar src={authUser?.avatarImgUrl}>{authUser?.name?.toUpperCase()}</Avatar>
            <div style={{
              margin: "0 10px 0 10px"
            }} className={"footer__data"}>
              <Typography>{authUser?.name}</Typography>
              <Typography>@{authUser?.userTag}</Typography>
            </div>
            <div className={"footer__options"}>
              <MoreHorizIcon/>
            </div>
          </div>
        </StyledFooter>
      </div>


      <Popup
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        anchorHorizontal={"center"}
        anchorVertical={"top"}
        originVertical={"bottom"}
        originHorizontal={"center"}
      >
        <StyledPopupTextWrap>
          <Divider/>
          <StyledPopupText onClick={() => navigate(AUTH_ROUTE)}>Add an existing account</StyledPopupText>
          <StyledPopupText onClick={() => dispatch(logout({navigate}))}>Log out</StyledPopupText>
        </StyledPopupTextWrap>
      </Popup>
    </>
  );
};

const {footerStyles} = sidebarMenu;

const styles = ({theme}) => ({
  '& .sidebar__footer': {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "16px",
    padding: "10px",
    borderRadius: 20,
  },

  '& .sidebar__footer: hover': {
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    transition: "0.5s",
    cursor: "pointer"
  },

  "& .footer__data": {
    margin: "0 10px 0 10px",
  },

  [theme.breakpoints.down('xl')]: {
    "& .footer__data, & .footer__options": {
      display: "none"
    }
  }
})

const StyledFooter = styled(Box)(styles);

SidebarFooter.propTypes = {
  theme: PropTypes.string
}

export default SidebarFooter;
