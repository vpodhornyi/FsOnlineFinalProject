import React from "react";
import {Navigate, redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {ROUTES} from "../../routes";


const PrivateRoute = ({route, authorized}) => {
  const {isPublic, page: Page} = route;
  console.log(route);
  // if (isPublic) return <Page authorized={authorized}/>;

  return authorized ? <Page authorized={authorized}/> : redirect(ROUTES.path);
};

PrivateRoute.propTypes = {
  route: PropTypes.object,
  authorized: PropTypes.bool,
}

export default PrivateRoute;
