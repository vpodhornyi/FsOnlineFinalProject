import React, {useState} from "react";
// import "./css/sidebarc.scss";

import {useSelector} from 'react-redux';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Avatar from '@mui/material/Avatar';
import {deepOrange} from "@mui/material/colors";
import Popover from '@mui/material/Popover';
import {Typography, MenuList, Link, Container, Box} from "@mui/material";
import SidebarMedia from "./SidebarMedia";
import MenuItemLink from "@components/Navigations/MenuItemLink";
import CustomMenuItem from "@components/Navigations/CustomMenuItem";
import {getHeaderState} from "@redux/header/selector";
import LogoIcon from "@components/Icons/LogoIcon";

const Sidebar = () => {
  const {
    navItems,
    logo: {
      color,
      href
    },
    more: {
      iconName,
      text
    }
  } = useSelector(getHeaderState);
  const [popup, setPopup] = useState(null);
  const screenWidth = window.screen.width;
  const handlePopupOpen = ev => setPopup(ev.currentTarget);
  const handlePopupClose = ev => setPopup(null);

  const isOpen = Boolean(popup);
  const popupId = open ? 'options' : undefined;


  return (
    <>
      {screenWidth < 420 ?
        <SidebarMedia/> :

        <Container sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh"
        }}>
          <Box>
            <Link
              color={color}
              href={href}>
              <LogoIcon/>
            </Link>
            <MenuList>
              {navItems.map(({text, iconName, color, href}) => (
                <MenuItemLink
                  key={text}
                  iconName={iconName}
                  text={text}
                  color={color}
                  href={href}/>)
              )}
              <CustomMenuItem iconName={iconName} text={text}></CustomMenuItem>
            </MenuList>

            {/*        <div className="content__item-btn">
              <div>Tweet</div>
            </div>
            <Avatar sx={{bgcolor: deepOrange[500]}} className="btn-media sidebar-hover">
              <HistoryEduIcon/>
            </Avatar>*/}
          </Box>
          <Box sx={{
            backgroundColor: "#fe0000"
          }}>
            Avatar
          </Box>
          {/*          <div className="sidebar__footer sidebar-hover" onClick={handlePopupOpen} aria-describedby={popupId}>
            <Avatar sx={{bgcolor: deepOrange[500]}}>N</Avatar>
            <div className="footer__data">
              тут будет стоять аттрибут src на аву юзера
              <p className="data-name">name</p>
              <p className="data-username">@username</p>
            </div>
            <div className="footer__options">
              <MoreHorizIcon/>
            </div>
          </div>*/}

          {/*          <Popover
            id={popupId}
            open={isOpen}
            anchorEl={popup}
            onClose={handlePopupClose}
            className="popover"
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <div>
              <Typography>Add an existing account</Typography>
              <Typography>Log out @username</Typography>
            </div>
          </Popover>*/}
        </Container>
      }
    </>
  );
};

export default Sidebar;
