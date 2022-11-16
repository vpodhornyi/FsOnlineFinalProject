import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {ListItemIcon, ListItemText, Typography} from "@mui/material";
import IconByName from "@components/icons/IconByName";

const More = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <CustomIconButton name='MoreHorizOutlined' title='More' size='small' iconSize='small'/>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconByName iconStyle={{color: 'red'}} iconName='DeleteOutlined'/>
          </ListItemIcon>
          <ListItemText>
            <Typography color='red' variant='body1'>Delete for you</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconByName iconName='ContentCopy'/>
          </ListItemIcon>
          <ListItemText>
            <Typography variant='body1'>Copy text</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}


export default More;
