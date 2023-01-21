import React from "react";
import {useRoutes} from "react-router-dom";
import PropTypes from "prop-types";

import {mainRoutes} from "./routes";
import ModalRoutes from "./ModalRoutes";


const MainRoutes = ({width, authorized, location, background}) => {
  return useRoutes(mainRoutes(width, authorized), background || location);
}

ModalRoutes.propTypes = {
  authorized: PropTypes.bool,
  location: PropTypes.object,
  background: PropTypes.object,
}

export default MainRoutes;
