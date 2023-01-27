import React from "react";
import {styled} from "@mui/material/styles";
import {useLocation} from "react-router-dom";
import {NavLink} from "react-router-dom";
import MainMenuButton from "./MainMenuButton";
import PropTypes from "prop-types";

const MainMenu = ({user, menu}) => {
  const location = useLocation();

  return (
    <MenuNav className='NavigationMenu'>
      {menu?.map(({path, text, iconName, iconActive, isBadge, badgeContent, modalPage}) => (
        <NavLink
          key={path}
          to={path}
          state={modalPage ? {background: location} : {}}
        >
          {({isActive}) => {
            return <MenuItem>
              <MainMenuButton
                user={user}
                isActive={isActive}
                isBadge={isBadge}
                badgeContent={badgeContent}
                iconName={isActive ? iconActive : iconName}
                text={text}/>
            </MenuItem>
          }}
        </NavLink>
      ))}
    </MenuNav>
  );
}

const MenuNav = styled('nav')(({theme}) => ({
  display: 'flex',

  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    position: 'relative',
  },
}));

const MenuItem = styled('div')(({theme}) => ({
  margin: '4px 0',
  display: 'flex',
  cursor: 'pointer',
  // color: theme.palette.action.active,

  '& .MainMenuButton': {
    borderRadius: 40,
  },

  '&:hover .MainMenuButton': {
    backgroundColor: theme.palette.background[3],
    transition: '0.1s'
  }
}));

MainMenu.propTypes = {
  user: PropTypes.object,
  menu: PropTypes.array,
}

export default MainMenu;
