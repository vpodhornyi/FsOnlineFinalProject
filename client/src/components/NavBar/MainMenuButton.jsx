import React from "react";
import PropTypes from "prop-types";
import {Typography, Badge} from "@mui/material";
import IconByName from "../icons/IconByName";
import {styled} from "@mui/material/styles";

const MainMenuButton = ({isActive, isBadge = false, badgeContent, iconName, text}) => (
  <Div className='MainMenuButton'>
    {isBadge ? <Badge
      badgeContent={badgeContent}
      color="primary"

      max={99}
    >
      <IconByName color='text' iconName={iconName}/>
    </Badge> : <IconByName color='text' iconName={iconName}/>}
    <Typography
      color='text'
      className={`LinkText ${isActive && 'LinkText_active'}`}
      variant='body1'
    >
      {text}
    </Typography>
  </Div>
);

const Div = styled('div')(({theme}) => ({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  '& .MuiBadge-badge': {
    color: theme.palette.common.white
  },

  '& .IconByName': {
    fontSize: '2rem',
  },

  '& .LinkText': {
    marginLeft: 14,
    fontSize: '1.254rem',
    fontWeight: theme.typography.fontWeightBold,

    [theme.breakpoints.up('xs')]: {
      display: 'none',
      fontWeight: theme.typography.fontWeightRegular
    },

    [theme.breakpoints.up('xl')]: {
      display: 'inline'
    },

    '&_active': {
      fontWeight: theme.typography.fontWeightBold,
    }
  },
}));

MainMenuButton.propTypes = {
  isActive: PropTypes.bool,
  isBadge: PropTypes.bool,
  badgeContent: PropTypes.any,
  iconName: PropTypes.string,
  text: PropTypes.string,
}

export default MainMenuButton;
