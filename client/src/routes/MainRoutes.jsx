import React from "react";
import {useLocation, useRoutes} from "react-router-dom";
import {useSelector} from "react-redux";
import {mainRoutes} from "./routes";


const MainRoutes = () => {
  const {authorized} = useSelector(state => state.auth);
  const {user: {userTag}} = useSelector(state => state.user);
  const location = useLocation();
  const background = location.state?.background;

  return useRoutes(mainRoutes(userTag, authorized), background || location);
}

export default MainRoutes;
