import React from "react";
import * as MuiIcons from "@mui/icons-material";
import PropTypes from "prop-types";

const Default = () => <></>;

const IconByName = ({iconName, styles}) => {
  const Icon = MuiIcons[iconName];
  return Icon ? <Icon sx={styles}/> : <Default/>;
};

IconByName.propTypes = {
  iconName: PropTypes.string,
  styles: PropTypes.object
}

export default IconByName;
