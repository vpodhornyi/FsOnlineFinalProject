import React from "react";

import PropTypes from "prop-types";
import {Link} from "@mui/material";
import CustomMenuItem from "./CustomMenuItem";


const MenuItemLink = ({iconName, text, href, color}) => (
  <Link href={href} color={color} underline="none">
    <CustomMenuItem iconName={iconName} text={text} color={color}/>
  </Link>
);

MenuItemLink.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
}

export default MenuItemLink;
