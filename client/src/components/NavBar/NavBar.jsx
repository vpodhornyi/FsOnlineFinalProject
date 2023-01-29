import React from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import MainMenu from "./MainMenu";
import TweetButton from "./TweetButton";
import NavBarFooter from "./NavBarFooter";
import {LogoIcon} from "../.";
import {PATH} from "../../utils/constants";

const NavBar = ({user, authorized, menu}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledBox>
      <Box className='NavWrapper'>
        <Link className='Logo' to={PATH.HOME}>
          <LogoIcon/>
        </Link>
        <MainMenu user={user} authorized={authorized} menu={menu}/>
        {
          authorized &&
          <Box onClick={() => navigate(PATH.TWEET.COMPOSE, {state: {background: location}})}>
            <TweetButton/>
          </Box>
        }
      </Box>
      {authorized && <NavBarFooter user={user}/>}
    </StyledBox>
  );
}

const styles = ({theme}) => ({
  height: '100vh',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: '15px 11px 0 11px',
  overflowY: 'auto',
  position: 'sticky',
  top: 0,

  '&  .NavWrapper': {
    width: '80px',

    [theme.breakpoints.up('xl')]: {
      width: '275px',
    },
  },

  '& .Logo': {
    paddingLeft: 15,
    color: theme.palette.logo.main,

    '& .MuiSvgIcon-root': {
      fontSize: '2rem'
    }
  }
})

const StyledBox = styled(Box)(styles);

NavBar.propTypes = {
  user: PropTypes.object,
  authorized: PropTypes.bool,
  menu: PropTypes.array,
}

export default NavBar;
