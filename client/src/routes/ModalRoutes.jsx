import React from "react";
import {useRoutes} from "react-router-dom";
import {useSelector} from "react-redux";
import {modalRoutes} from "./routes";


const ModalRoutes = () => {
  const {authorized} = useSelector(state => state.auth);

  return useRoutes(modalRoutes(authorized));
}

export default ModalRoutes;
