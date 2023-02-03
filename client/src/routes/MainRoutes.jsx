import React from "react";
import {useRoutes} from "react-router-dom";
import PropTypes from "prop-types";

import {mainRoutes} from "./routes";
import ModalRoutes from "./ModalRoutes";


const MainRoutes = ({width, authorized, location}) => {
  return useRoutes(mainRoutes(width, authorized), location);
}

ModalRoutes.propTypes = {
  authorized: PropTypes.bool,
  location: PropTypes.object,
}

export default MainRoutes;
