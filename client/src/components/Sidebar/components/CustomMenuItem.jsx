import React from "react";

import IconByName from "../../icons/IconByName";
import {MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import PropTypes from "prop-types";


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
