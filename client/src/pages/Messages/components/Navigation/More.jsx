import React, {useState} from 'react';
import {styled} from "@mui/material/styles";
import {ListItemIcon, ListItemText, Typography, Box, MenuItem, Menu} from "@mui/material";

import CustomIconButton from "@components/buttons/CustomIconButton";
import IconByName from "@components/icons/IconByName";
import PropTypes from "prop-types";

const More = ({toggleModal}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openLeaveChatConfirm = () => {
    toggleModal();
    handleClose();
  }


  return (
    <Box onClick={e => e.stopPropagation()}>
      <Box
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <CustomIconButton name='MoreHorizOutlined' title='More' size='middle' iconSize='middle'/>
      </Box>
      <Box>
        <MenuWrapper
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <IconByName iconName='PushPinOutlined'/>
            </ListItemIcon>
            <ListItemText>
              <Typography variant='body1'>Pin conversation</Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <IconByName iconName='NotificationsOffOutlined'/>
            </ListItemIcon>
            <ListItemText>
              <Typography variant='body1'>Snooze conversation</Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={openLeaveChatConfirm}>
            <ListItemIcon>
              <IconByName iconStyle={{color: 'red'}} iconName='DeleteOutlined'/>
            </ListItemIcon>
            <ListItemText>
              <Typography color='red' variant='body1'>Delete conversation</Typography>
            </ListItemText>
          </MenuItem>
        </MenuWrapper>
      </Box>
    </Box>
  );
}


const MenuWrapper = styled(Menu)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important',
    borderRadius: '12px !important',

    '& .MuiList-root': {
      padding: 0,

      '& .MuiButtonBase-root': {
        padding: '11px 15px',
        borderBottom: '1px solid rgb(239, 243, 244)',

        '& .MuiTouchRipple-root': {
          display: 'none'
        },
      }
    }
  },
}));

More.propTypes = {
  toggleModal: PropTypes.func,
}

export default More;
