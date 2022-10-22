import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({route}) => {
  const {authorized} = useSelector((state) => state.auth)
  const {isPublic, element: Element} = route;

  if (isPublic) return <Element/>;

  return authorized ? <Element/> : <Navigate to="/"/>
};

PrivateRoute.propTypes = {
  route: PropTypes.object,
  isPublic: PropTypes.bool,
  element: PropTypes.element
}

export default PrivateRoute;
