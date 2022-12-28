import React from "react";
import IconsByName from "./IconByName";
import PropTypes from "prop-types";

const LogoIcon = ({styles}) => {
  return <IconsByName iconName='Twitter' iconStyle={styles}/>;
};

LogoIcon.propTypes = {
  styles: PropTypes.object
}

export default LogoIcon;
