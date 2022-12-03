import React from "react";
import * as MuiIcons from "@mui/icons-material";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const Default = () => <Box fontSize={20}>☺</Box>;

const IconByName = ({iconName, iconStyle, color}) => {
  const Icon = MuiIcons[iconName];
  return Icon ? <Icon color={color} className='IconByName' sx={iconStyle}/> : <Default/>;
};

IconByName.propTypes = {
  iconName: PropTypes.string,
  iconStyle: PropTypes.object,
  color: PropTypes.string
};

export default IconByName;
