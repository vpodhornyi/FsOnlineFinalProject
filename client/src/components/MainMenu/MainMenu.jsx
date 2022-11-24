import React from "react";
import {styled} from "@mui/material/styles";
import {NavLink} from "react-router-dom";
import MainMenuButton from "./MainMenuButton";
import PropTypes from "prop-types";

const MainMenu = ({authorized, menu}) => {

  return (
    <MenuNav>
      {menu?.map(({path, text, iconName, iconActive}) => (
        <NavLink key={path} to={path} style={{textDecoration: 'none'}}>
          {({isActive}) => (
            <MenuItem>
              <MainMenuButton
                isActive={isActive}
                iconName={isActive ? iconActive : iconName}
                text={text}/>
            </MenuItem>
          )}
        </NavLink>
      ))}
      {authorized &&
        <MenuItem>
          <MainMenuButton
            isActive={false}
            iconName='MoreHoriz'
            text='More'/>
        </MenuItem>
      }
    </MenuNav>
  );
}

export const MenuNav = styled('nav')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',

  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    position: 'relative',
  },
}));

export const MenuItem = styled('div')(({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  color: theme.palette.action.active,

  '&:hover .MainMenuButton': {
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  }
}));

MainMenu.propTypes = {
  authorized: PropTypes.bool,
  menu: PropTypes.array,
}

export default MainMenu;
