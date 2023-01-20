import React from "react";
import {useRoutes} from "react-router-dom";
import PropTypes from "prop-types";

import {mainRoutes} from "./routes";
import ModalRoutes from "./ModalRoutes";


const MainRoutes = ({authorized, authUser, location, background}) => {
  return useRoutes(mainRoutes(authUser, authorized), background || location);
}

ModalRoutes.propTypes = {
  authorized: PropTypes.bool,
  authUser: PropTypes.object,
  location: PropTypes.object,
  background: PropTypes.object,
}

export default MainRoutes;
