import React from "react";
import {useRoutes} from "react-router-dom";
import PropTypes from "prop-types";

import {mainRoutes} from "./routes";
import ModalRoutes from "./ModalRoutes";


const MainRoutes = ({authorized, userTag, location, background}) => {
  return useRoutes(mainRoutes(userTag, authorized), background || location);
}

ModalRoutes.propTypes = {
  authorized: PropTypes.bool,
  userTag: PropTypes.string,
  location: PropTypes.object,
  background: PropTypes.object,
}

export default MainRoutes;
