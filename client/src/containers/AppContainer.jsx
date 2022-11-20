import React, {Suspense, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, useLocation} from "react-router-dom";
import {PageLoader, Preloader} from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import DialogWindow from "@components/DialogWindow";
import routes from "../routes";
import {AUTH_ROUTE, LOGOUT_ROUTE} from "../utils/constants";
import Container from "@mui/material/Container";
import Sidebar from "../components/Sidebar/Sidebar";
import {getPersonalData} from "../redux/auth/selector";

const AppContainer = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const authUser = useSelector(getPersonalData);

  const loading = useSelector((state) => state.auth.loading);

  const routeComponents = useMemo(() => routes.map(route => (
      <Route key={route.path} path={route.path} element={
        <PrivateRoute route={route}/>
      }/>
    )),
    []
  );

  return (
    <>
      {
        pathname !== AUTH_ROUTE && pathname !== LOGOUT_ROUTE ?
          <Container sx={{display: "flex"}}>
            <Sidebar/>
            <Preloader loaded={!loading}/>
            <DialogWindow/>
            <Suspense fallback={<PageLoader loaded={!loading}/>}>
              <Routes>{routeComponents}</Routes>
            </Suspense>
          </Container>
          :
          <>
            <Preloader loaded={!loading}/>
            <DialogWindow/>
            <Suspense fallback={<PageLoader loaded={!loading}/>}>
              <Routes>{routeComponents}</Routes>
            </Suspense>
          </>
      }
    </>
  )
}

export default AppContainer;
