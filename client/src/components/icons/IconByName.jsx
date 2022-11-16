import React from "react";
import * as MuiIcons from "@mui/icons-material";
import PropTypes from "prop-types";

const Default = () => <>:-)</>;

const IconByName = ({iconName, iconStyle}) => {
  const Icon = MuiIcons[iconName];
  return Icon ? <Icon sx={iconStyle}/> : <Default/>;
};

IconByName.propTypes = {
  iconName: PropTypes.string,
  iconStyle: PropTypes.object
};

export default IconByName;
