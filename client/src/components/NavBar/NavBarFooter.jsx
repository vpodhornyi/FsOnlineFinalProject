import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import PropTypes from "prop-types";

import IconsByName from "../icons/IconByName";
import {logout} from '@redux/auth/action';

const NavBarFooter = ({user}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutClick = () => {
    dispatch(logout({navigate}));
  }

  return (
    <>
      <MenuWrapper
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
        <MenuItem onClick={logoutClick}>
          <ListItemText>
            <Typography fontWeight='bold' variant='body1'>Log out @{user?.userTag}</Typography>
          </ListItemText>
        </MenuItem>
      </MenuWrapper>
      <BoxWrapper onClick={handleClick}>
        <Box className='UserBox'>
          <StyledAvatar src={user.avatarImgUrl}/>
          <Box>
            <Typography className='UserName' variant='h2'>{user?.name}</Typography>
            <Typography variant='body2'>@{user?.userTag}</Typography>
          </Box>
        </Box>
        <IconsByName color='text' iconName='MoreHoriz'/>
      </BoxWrapper>
    </>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: 'fit-content',
  padding: 11,
  margin: '11px 0',
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',

  [theme.breakpoints.up('md')]: {
    width: '100%',
  },

  '&:hover': {
    backgroundColor: theme.palette.background[3],
    transition: '0.1s'
  },

  '& .UserBox': {
    display: 'flex',
    alignItems: 'center',

    '& .UserName': {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '1.3rem',
    },

    '& .MuiBox-root': {
      marginLeft: 10,
      display: 'none',

      [theme.breakpoints.up('xl')]: {
        display: 'block'
      }

    },
  },

  '& .MuiSvgIcon-root': {
    display: 'none',

    [theme.breakpoints.up('xl')]: {
      display: 'block',
    }
  }
}));

const MenuWrapper = styled(Menu)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important',
    borderRadius: '12px !important',
    padding: '10px 0',
    backgroundColor: theme.palette.background.main,

    '& .MuiList-root': {
      padding: 0,

      '& .MuiButtonBase-root': {
        width: '300px',
        padding: '11px 15px',
        backgroundColor: theme.palette.background.main,

        '&:hover': {
          backgroundColor: theme.palette.background[1],
        },

        '& .MuiTouchRipple-root': {
          display: 'none'
        },
      }
    }
  },
}));

const StyledAvatar = styled(Avatar)(({theme}) => ({
  cursor: 'pointer',
  width: '3.3rem',
  height: '3.3rem',
}));

NavBarFooter.propTypes = {
  user: PropTypes.object,
}
export default NavBarFooter;
