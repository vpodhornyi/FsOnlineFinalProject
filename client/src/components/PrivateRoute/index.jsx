import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {AUTH_ROUTE, HOME_ROUTE} from "@utils/constants";


const PrivateRoute = ({route}) => {
  const {authorized} = useSelector((state) => state.auth);
  const {isPublic, isLogin, element: Element} = route;

  if (authorized && isLogin) return <Navigate to={HOME_ROUTE}/>;
  
  if (isPublic) return <Element/>;

  return authorized ? <Element/> : <Navigate to={AUTH_ROUTE}/>

};

PrivateRoute.propTypes = {
  route: PropTypes.object,
  isPublic: PropTypes.bool,
  element: PropTypes.element,
};

export default PrivateRoute;
