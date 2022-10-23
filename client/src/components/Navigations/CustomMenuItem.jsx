import React from "react";

import PropTypes from "prop-types";
import {MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import IconByName from "@components/Icons/IconByName";


const CustomMenuItem = ({iconName, text, color}) => (
    <MenuItem>
      <ListItemIcon>
        <IconByName iconName={iconName} styles={{color, fontSize: "30px"}}/>
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
);

CustomMenuItem.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string
}

export default CustomMenuItem;
