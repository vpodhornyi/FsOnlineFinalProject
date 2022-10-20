import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({isPublic, isAdminRoute, ...route}) => {
  const {authorized, user: {isAdmin}} = useSelector((state) => state.auth)

  // if (isAdminRoute) {
  //   return isAdmin ? <Route {...route} /> : <Redirect to="/"/>
  // }

  // if (isPublic) {
  //   return <Route {...route} />
  // }


  // return authorized ? <Route {...route} /> : <Redirect to="/"/>
  return <Route {...route} />
};

PrivateRoute.propTypes = {
  isPublic: PropTypes.bool,
  isAdminRoute: PropTypes.bool,
}

export default PrivateRoute;
