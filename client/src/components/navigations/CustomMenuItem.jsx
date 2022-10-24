import React from "react";

import PropTypes from "prop-types";
import {MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import IconByName from "@components/icons/IconByName";


const CustomMenuItem = ({iconName, text, iconStyle, textStyle}) => (
    <MenuItem>
      <ListItemIcon>
        <IconByName iconName={iconName} iconStyle={iconStyle}/>
      </ListItemIcon>
      <ListItemText sx={textStyle}>{text}</ListItemText>
    </MenuItem>
);

CustomMenuItem.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
  iconStyle: PropTypes.object,
  textStyle: PropTypes.object,
}

export default CustomMenuItem;
