import React from "react";
import {useSelector} from 'react-redux';

import {MenuList, Box} from "@mui/material";
import {styled} from "@mui/material/styles";
import MenuItemLink from "@components/navigations/MenuItemLink";
import CustomMenuItem from "@components/navigations/CustomMenuItem";
import {getMainMenuState} from "@redux/business/menu/mainMenu/selector";
import useMediaQuery from "@mui/material/useMediaQuery";

const isMatchesUrl = href => href.split('/').pop() === window.location.href.split('/').pop();

const MainMenu = () => {
  const {
    mainMenuStyle,
    navItems,
    more: {
      iconName,
      text
    },
    textStyle
  } = useSelector(getMainMenuState);
  const matches = useMediaQuery('(max-width:1280px)');
  const StyledMenuList = styled((props) => (
    <MenuList {...props}/>
  ))(({theme}) => (matches ? {...mainMenuStyle, ...mainMenuStyle.active} : {...mainMenuStyle}));

  return (
    <>
      <StyledMenuList>
        {navItems.map(({text, iconName, iconActive, color, href}) => (
          <MenuItemLink
            key={text}
            iconName={isMatchesUrl(href) ? iconActive : iconName}
            text={text}
            textStyle={isMatchesUrl(href) ? {...textStyle, ...textStyle.active} : textStyle}
            iconStyle={{
              color,
              fontSize: 30
            }}
            href={href}/>)
        )}
        <Box sx={{
          '&:hover > .MuiMenuItem-root': {
            borderRadius: 40,
            backgroundColor: '#E0E0E0'
          },
          display: 'flex',
          cursor: 'pointer'
        }}>
          <CustomMenuItem iconName={iconName} text={text}></CustomMenuItem>
        </Box>
      </StyledMenuList>
    </>
  );
}

export default MainMenu;
