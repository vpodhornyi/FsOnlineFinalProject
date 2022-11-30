import React, {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {useResizeDetector} from 'react-resize-detector';

import MainMenu from "./MainMenu";
import MainMenuButton from "./MainMenuButton";
import TweetButton from "./TweetButton";
import {LogoIcon, CustomFabButton} from "../.";
import SidebarFooter from "../Sidebar/components/SidebarFooter";
import {ACTIONS} from '@redux/service/action';
import {PATH} from "../../utils/constants";


const NavBar = ({authorized, menu}) => {
  const dispatch = useDispatch();
  const onResize = useCallback(width => dispatch(ACTIONS.setAppBarWidth({width})), []);
  const {ref} = useResizeDetector({onResize});

  return (
    <StyledBox ref={ref}>
      <Box className='NavWrapper'>
        <Link className='Logo' to={PATH.HOME}>
          <LogoIcon/>
        </Link>
        <MainMenu authorized={authorized} menu={menu}/>
        {authorized && <TweetButton/>}
      </Box>
      {authorized && <SidebarFooter/>}
    </StyledBox>
  );
}

const styles = ({theme}) => ({
  height: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: '15px 11px 0 11px',

  '&  .NavWrapper': {
    width: '80px',

    [theme.breakpoints.up('xl')]: {
      width: '275px',
    },
  },

  '& .Logo': {
    paddingLeft: 15,
    color: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      fontSize: '2rem'
    }
  }

})

const StyledBox = styled(Box)(styles);

NavBar.propTypes = {
  authorized: PropTypes.bool,
  menu: PropTypes.array,
}

export default NavBar;
