import React, {useContext} from "react";
import {styled} from "@mui/material/styles";
import {useLocation} from "react-router-dom";
import {NavLink} from "react-router-dom";
import MainMenuButton from "./MainMenuButton";
import PropTypes from "prop-types";

const MainMenu = ({menu}) => {
  const location = useLocation();

  return (
    <MenuNav>
      {menu?.map(({path, text, iconName, iconActive, modalPage}) => (
        <NavLink
          key={path}
          to={path}
          style={{textDecoration: 'none'}}
          state={modalPage ? {background: location} : {}}
        >

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
    </MenuNav>
  );
}

const MenuNav = styled('nav')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',

  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    position: 'relative',
  },
}));

const MenuItem = styled('div')(({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  color: theme.palette.action.active,

  '&:hover .MainMenuButton': {
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  }
}));

MainMenu.propTypes = {
  menu: PropTypes.array,
}

export default MainMenu;
