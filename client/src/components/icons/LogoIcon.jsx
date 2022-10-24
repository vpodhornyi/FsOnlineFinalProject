import React from "react";
import IconsByName from "./IconByName"
import {getLogoIconState} from "@redux/business/logoIcon/selector";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const LogoIcon = ({styles}) => {
  const {logo: {iconName}} = useSelector(getLogoIconState);

  return <IconsByName iconName={iconName} styles={styles}/>;
};

LogoIcon.propTypes = {
  styles: PropTypes.object
}

export default LogoIcon;
