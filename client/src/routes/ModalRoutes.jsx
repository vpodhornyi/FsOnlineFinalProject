import React from "react";
import {useRoutes} from "react-router-dom";
import PropTypes from "prop-types";

import {modalRoutes} from "./routes";


const ModalRoutes = ({authorized}) => {
  return useRoutes(modalRoutes(authorized));
}

ModalRoutes.propTypes = {
  authorized: PropTypes.bool,
}

export default ModalRoutes;
