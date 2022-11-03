import React from "react";

import CustomMenuItem from "./CustomMenuItem";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


const MenuItemLink = ({onClick, iconName, text, href, iconStyle, textStyle}) => (
  <Link onClick={onClick} to={href} style={{textDecoration: "none"}}>
    <CustomMenuItem iconName={iconName} text={text} iconStyle={iconStyle} textStyle={textStyle}/>
  </Link>
);

MenuItemLink.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
  href: PropTypes.string,
  iconStyle: PropTypes.object,
  textStyle: PropTypes.object,
  onClick: PropTypes.func,
}

export default MenuItemLink;
