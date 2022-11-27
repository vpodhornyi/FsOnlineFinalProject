import React, {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {useResizeDetector} from 'react-resize-detector';

import {MainMenu, LogoIcon, CustomFabButton} from "../components";
import SidebarFooter from "./Sidebar/components/SidebarFooter";
import {ACTIONS} from '@redux/service/action';

const AppBar = ({authorized, menu}) => {
  const dispatch = useDispatch();
  const onResize = useCallback(width => dispatch(ACTIONS.setAppBarWidth({width})), []);
  const {ref} = useResizeDetector({onResize});

  return (
    <StyledBox ref={ref}>
      <Box>
        <Link
          //TODO change to router PATH
          to={'/Home'}>
          <LogoIcon/>
        </Link>
        <MainMenu authorized={authorized} menu={menu}/>
      </Box>
      {authorized &&
        /*    <Box onClick={() => dispatch(logout())}>
              <CustomFabButton
                name={"Logout"}/>
            </Box>*/
        <SidebarFooter/>
      }
    </StyledBox>
  );
}

const styles = ({theme}) => ({
  height: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
})

const StyledBox = styled(Box)(styles);

AppBar.propTypes = {
  authorized: PropTypes.bool,
  menu: PropTypes.array,
}

export default AppBar;
