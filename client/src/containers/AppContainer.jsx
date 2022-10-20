import React, { lazy, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLoader, Preloader } from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import DialogWindow from "@components/DialogWindow";
import Auth from "@pages/Auth";
import Home from "@pages/Home";

const routes = [
  {
    isPublic: true,
    isAdminRoute: false,
    exact: true,
    path: "/",
    element: lazy(() => import("@pages/Auth")),
  },
  {
    isPublic: false,
    isAdminRoute: false,
    exact: true,
    path: "/home",
    element: lazy(() => import("@pages/Home")),
  }
];

const AppContainer = () => {
  const loading = useSelector((state) => state.auth.loading)

  const routeComponents = useMemo(
    () => routes.map(({ isPublic,isAdminRoute, ...route }) => {
      return (
        <PrivateRoute key={route.path} isPublic={isPublic} isAdminRoute={isAdminRoute} {...route} />
      )
    }),
    []
  );

  return (
    <>
      <Preloader loaded={!loading} />
      <DialogWindow/>
      <Suspense fallback={<PageLoader loaded={!loading} />}>
          <Routes>
            <Route key={1} path="/" element={<Auth/>}/>
            <Route key={2} path="/home" element={<Home/>}/>
          </Routes>
      </Suspense>
    </>
  )
}

export default AppContainer;
