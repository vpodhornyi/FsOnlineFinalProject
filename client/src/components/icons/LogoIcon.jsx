import React from "react";
import IconsByName from "./IconByName";
import {twitterIcon} from "../Sidebar/data/twitterIcon";
import PropTypes from "prop-types";

const LogoIcon = ({styles}) => {
  const {iconName} = twitterIcon;

  return <IconsByName iconName={iconName} styles={styles}/>;
};

LogoIcon.propTypes = {
  styles: PropTypes.object
}

export default LogoIcon;
