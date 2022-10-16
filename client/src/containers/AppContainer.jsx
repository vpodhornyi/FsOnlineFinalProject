import React, { lazy, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { PageLoader, Preloader } from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import DialogWindow from "@components/DialogWindow";

const routes = [
  {
    isPublic: true,
    exact: true,
    path: "/",
    component: lazy(() => import("@pages/Auth")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/home",
    component: lazy(() => import("@pages/Home")),
  }
]

const AppContainer = () => {
  const loading = useSelector((state) => state.auth.loading)

  const routeComponents = useMemo(
    () => routes.map(({ isPublic,isAdminRoute, ...route }) => (
        <PrivateRoute key={route.path} isPublic={isPublic} isAdminRoute={isAdminRoute} {...route} />
      )),
    []
  )

  return (
    <>
      <Preloader loaded={!loading} />
      <DialogWindow/>
      <Suspense fallback={<PageLoader loaded={!loading} />}>
        <Switch>{routeComponents}</Switch>
      </Suspense>
    </>
  )
}

export default AppContainer;
