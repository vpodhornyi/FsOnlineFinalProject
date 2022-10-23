import React, {Suspense, useMemo} from "react";
import {useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import {PageLoader, Preloader} from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import DialogWindow from "@components/DialogWindow";
import routes from "../routes";

const AppContainer = () => {
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
      <Preloader loaded={!loading}/>
      <DialogWindow/>
      <Suspense fallback={<PageLoader loaded={!loading}/>}>
        <Routes>{routeComponents}</Routes>
      </Suspense>
    </>
  )
}

export default AppContainer;
