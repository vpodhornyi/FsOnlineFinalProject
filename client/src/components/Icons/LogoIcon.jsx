import React from "react";
import IconsByName from "./IconByName"
import {getHeaderState} from "@redux/header/selector";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const LogoIcon = ({styles}) => {
  const {logo} = useSelector(getHeaderState);

  return <IconsByName iconName={logo && logo.iconName} styles={styles}/>;
};

LogoIcon.propTypes = {
  styles: PropTypes.object
}

export default LogoIcon;
